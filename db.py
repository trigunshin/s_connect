import mysql.connector

class SQL_DB():
    def __init__(self, app_config):
        self.username = app_config['DB_USERNAME']
        self.password = app_config['DB_PASSWORD']
        self.host = app_config['DB_HOST']
        self.database = app_config['DB_DATABASE']
        self._tables = app_config['TABLES']

        self.cnx = mysql.connector.connect(
            user=app_config['DB_USERNAME'],
            password=app_config['DB_PASSWORD'],
            host=app_config['DB_HOST'],
            database=app_config['DB_DATABASE'])

    def _create_database(self, cursor):
        try:
            cursor.execute(
                "CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(DB_NAME))
        except mysql.connector.Error as err:
            print "Failed creating database: ", err

    def _dict_transform(self, columns, result_data):
        ret = {}
        for name, datum in zip(columns, result_data):
            ret[name] = datum
        return ret

    def save_submission(self, candidate_name, candidate_email, job_id, user_id, resume_path):
        cursor = self.cnx.cursor()
        insert_submission = (
          "insert into submissions (name, email, job_id, user_id, resume_path) VALUES"
          "(%(candidate_name)s, %(candidate_email)s, %(job_id)s, %(user_id)s, %(resume_path)s)")
        submission_data = {
          'candidate_name': candidate_name,
          'candidate_email': candidate_email,
          'job_id': job_id,
          'user_id': user_id,
          'resume_path': resume_path
        }

        cursor.execute(insert_submission, submission_data)
        self.cnx.commit()
        cursor.close()

    def get_submissions(self):
        cursor = self.cnx.cursor()
        query = ("SELECT * FROM submissions ")
        cursor.execute(query, ())

        results = cursor.fetchall()
        columns = cursor.column_names

        ret = [self._dict_transform(columns, r) for r in results]

        cursor.close()
        return ret

    def ensure_databases(self):
        try:
            self.cnx.database = self.database
            cursor = self.cnx.cursor()
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_BAD_DB_ERROR:
                self._create_database(cursor)
                self.cnx.database = self.database
            else:
                print(err)

        for name, ddl in self._tables.iteritems():
            try:
                print "Creating table %s: " % name
                cursor.execute(ddl)
            except mysql.connector.Error as err:
                if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
                    print("already exists.")
                else:
                    print(err.msg)
            else:
                print("OK")

        cursor.close()