


function ListController ($scope, $http) 
{

 //for pagination and searching

if ( $scope.limit == undefined )
{
    $scope.limit = 5 ;
}
if ( $scope.offset == undefined )
{
    $scope.offset = 0 ;
}


$http.get('/wines/all').
    success(
            function(data, status, headers, config) 
            {
            
                $scope.wines = data[0].slice($scope.offset*$scope.limit, $scope.offset*$scope.limit + $scope.limit);

                if ( $scope.total == undefined )
                {
                   $scope.total = data[0].length ;
                } 

                if ( $scope.pageCount == undefined )
                {
                    $scope.pageCount = Math.floor($scope.total / $scope.limit) 

                    if ($scope.total % $scope.limit !== 0)
                    {
                        $scope.pageCount += 1 ;
                    }
                } 
        
    });

$scope.selectwine = function() 
{
    if ($scope.wine == undefined)
    {
        return false;
    }

    if( $scope.wine.name != "")
    {
         return true ;
    }
    
}


$scope.loadPage = function (pg) 
    {
 
     //for pagination and searching

        if ( $scope.limit == undefined )
        {
            $scope.limit = 5 ;
        }

        $scope.offset = pg - 1;

        $http.get('/wines/all').
            success(
            function(data, status, headers, config) 
            {
            
                var end = $scope.offset*$scope.limit + $scope.limit ;

                console.log("The end is " + end ) ;

                if ( end >  $scope.total )
                {
                    end = $scope.total ;
                }

                console.log("The end2 is " + end ) ;

                $scope.wines = data[0].slice($scope.offset*$scope.limit, end);

                               
           });
  
      }


  $scope.hasPic = function() 
    {
        if ($scope.wine.picture == undefined)
        {
            return false;
        }

        if( $scope.wine.picture != "")
        {
             return true ;
        }
    
    }


}


function CreateController($scope, $http,$location) {

    var wine = 
    {
        name: "",
        year: "",
        grapes: "",
        country: "",
        region: "",
        description: "",
        picture: ""
    }

     var picfile = 
    {
        data: ""
    }


    $scope.wine = wine; 
    $scope.action = "Add" ;

    $scope.save = function() 
    {
         var formData = new FormData();

        formData.append('PicData', $scope.picture);

        formData.append('PicName', $scope.wine.picture);

        var xhr = new XMLHttpRequest();

        xhr.open("POST", "/wines/uploadpic");

        xhr.send(formData);

          $http.post('/wines/add', $scope.wine).
          success(
            function(data) {
            $location.path('/');
        });
    }

    $scope.hasPic = function() 
    {
        if ($scope.wine.picture == undefined)
        {
            return false;
        }

        if( $scope.wine.picture != "")
        {
             return true ;
        }
    
    }


}

function EditController($scope, $http,$location,$routeParams) {

    var wine = 
    {
        name: "",
        year: "",
        grapes: "",
        country: "",
        region: "",
        description: "",
        picture: ""
    }

    var picfile = 
    {
        data: ""
    }

    $scope.wine = wine; 
    $scope.action = "Edit" ;

    console.log ( " ID of the wine is " + $routeParams.id) ;
    

    $http.get('/wines/' + $routeParams.id).
    success(
    function(data, status, headers, config) {
       $scope.wine = data;
    });


    $scope.save = function() 
    {
        
        var formData = new FormData();

        formData.append('PicData', $scope.picture);

        formData.append('PicName', $scope.wine.picture);

        var xhr = new XMLHttpRequest();

        xhr.open("POST", "/wines/uploadpic");

        xhr.send(formData);

         $http.put('/wines/edit/' + $routeParams.id, $scope.wine).
          success(
            function(data) {
            $location.path('/');
        });
    }

    $scope.hasPic = function() 
    {
        if ($scope.wine.picture == undefined)
        {
            return false;
        }

        if( $scope.wine.picture != "")
        {
             return true ;
        }
    
    }

   

    

}


$scope.$on("fileSelected", function (event, args) 
                         {
                            
                             $scope.wine.picture =  args.file.name;

                            $scope.picture =  args.file;

                         }
        );


