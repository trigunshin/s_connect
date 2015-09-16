var scoutApp = angular.module('scoutConnectApp', ['angularFileUpload']);

scoutApp.controller('ConnectCtrl', ['$scope', '$http', 'FileUploader', function ($scope, $http, FileUploader) {
    $scope.user = {name:"SCOUTUSER", id: 1};
    $scope.search_query = '';
    $scope.selected_job = {
        title:'Select a Job',
        description: 'Description will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up here'
    };

    $http.get('/search').success(function(data) {
        $scope.search_results = data.data;
        console.info(data);
    });

    $scope.job_click = function(e) {
        var job_id = $(e.currentTarget).attr('data-job-id');
        $scope.selected_job = $scope.search_results[job_id-1];
        console.info(job_id);
    };

    $scope.req_search = function() {
        // $scope.search_query;
        $http.get('/search').success(function(data) {
            $scope.search_results = data.data;
            console.info(data);
        });
    };

    $scope.candidate_submit = function(file) {
        var up_file = $scope.uploader.queue[0];
        up_file.upload();
    }

    var uploader = $scope.uploader = new FileUploader({
            url: '/submit'
        });

    // CALLBACKS
    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
        item.formData = [
            {candidate_email: $scope.candidate_email},
            {candidate_name: $scope.candidate_name},
            {job_id: $scope.selected_job.id},
            {user_id: $scope.user.id}
        ];
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };
}]);
