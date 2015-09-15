/*angular
    .module('app', ['angularFileUpload'])
    .controller('AppController', ['$scope', 'FileUploader', function($scope, FileUploader) {
        
    }]);
//*/
var scoutApp = angular.module('scoutConnectApp', ['angularFileUpload']);

scoutApp.controller('ConnectCtrl', ['$scope', '$http', 'FileUploader', function ($scope, $http, FileUploader) {
    $scope.search_query = '';
    $scope.selected_job = {title:'Select a Job'};

    $http.get('/search').success(function(data) {
        $scope.search_results = data.data;
        console.info(data);
    });

    $scope.job_click = function(e) {
        var job_id = $(e.currentTarget).attr('data-job-id');
        $scope.selected_job = $scope.search_results[job_id-1];
        console.info(job_id);
    };

    $scope.candidate_submit = function() {

    };

    $scope.req_search = function() {
        // $scope.search_query;
        $http.get('/search').success(function(data) {
            $scope.search_results = data.data;
            console.info(data);
        });
    };
//*
    $scope.upload_file = function(file) {
        console.log(file);
        console.log($scope.resume_file);
        var up_file = $scope.uploader.queue[0];
        console.log(up_file);
        up_file.upload();

        /*file.upload = Upload.upload({
            url: '/submit',
            method: 'POST',
            headers: {
                //'my-header': 'my-header-value'
            },
            fields: {username: $scope.username, email: $scope.candidate_email},
            file: file,
            fileFormDataName: 'myFile'
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });
        file.upload.progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
//*/
    }//*/

    var uploader = $scope.uploader = new FileUploader({
            url: '/submit'
        });

        // FILTERS
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
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
                {candidate_name: $scope.candidate_name}
            ];
            /*
            if(item.formData.length == 0) {
                item.formData.push({candidate_email: $scope.candidate_email});
                item.formData.push({candidate_name: $scope.candidate_name});
            }
            //*/
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
        console.info('uploader', uploader);
}]);
