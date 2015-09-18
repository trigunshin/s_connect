DEBUG = True
UPLOADS_DEFAULT_DEST = 'uploads'
UPLOADED_RESUMES_ALLOW = ('pdf', 'PDF')  # can't just use 'pdf' or ['pdf']
MAX_CONTENT_LENGTH = 32 * 1024 * 1024

MAX_CONTENT_LENGTH = 32 * 1024 * 1024

DB_USERNAME = 'vagrant'
DB_PASSWORD = 'vagrant'
DB_DATABASE = 'connect'
DB_HOST = '127.0.0.1'

TABLES = {}
TABLES['submissions'] = (
    "CREATE TABLE IF NOT EXISTS `submissions` ("
    "  `id` int(12) NOT NULL AUTO_INCREMENT,"
    "  `name` varchar(64) NOT NULL,"
    "  `email` varchar(64) NOT NULL,"
    "  `job_id` varchar(16) NOT NULL,"
    "  `user_id` int(12) NOT NULL,"
    "  `resume_path` varchar(255) NOT NULL,"
    "  `resume_url` varchar(255) DEFAULT NULL,"
    "  `created` timestamp DEFAULT CURRENT_TIMESTAMP,"
    "  PRIMARY KEY (`id`)"
    ") ENGINE=InnoDB")
