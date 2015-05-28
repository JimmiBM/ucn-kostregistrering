app.controller('MealRecommendationCtrl', function($scope, Meals, $window, $ionicSideMenuDelegate){
	$scope.userWeight = 100;
	$scope.proteinToday = 75;
	$scope.energyToday = 6000;
	
	$scope.currentHour = 11;
	
	var breakfastRecommendations = [];
	var lunchRecommendations = [];
	var dinnerRecommendations = [];
	var mealRecommendations = [];
	
	var breakfastRecommendation = { "id": 2, "cat": "breakfast", "name": "1 stk. rundstykke smurt", "energy": 550, "protein": 6.5 };
	var lunchRecommendation = { "id": 34, "cat": "lunch", "name": "Pålæg til 1/2 stk. brød", "energy": 170, "protein": 4 };
	var dinnerRecommendation = {"id": 41,"cat": "dinner","name": "1 port. hovedret, normal", "energy": 1900, "protein": 20 };
	
	breakfastRecommendations.push(breakfastRecommendation);
	lunchRecommendations.push(lunchRecommendation);
	dinnerRecommendations.push(dinnerRecommendation);
	
	if($scope.currentHour > 6 && $scope.currentHour < 12)
	{
		mealRecommendations = breakfastRecommendations;
	}
	else if($scope.currentHour < 16)
	{
		mealRecommendations = lunchRecommendation;
	}
	else if($scope.currentHour < 22)
	{
		mealRecommendations = dinnerRecommendation;
	}
	
	$scope.energyNeeded = function(energyPerKilo){
		return userWeight * energyPerKil - energyToday;
	}
	
	$scope.proteinNeeded = function(proteinPerKilo){
		return userWeight * proteinPerKilo - proteinToday;
	}
	
	$scope.recommendedBreakfast = function(proteinPerKilo){
		var breakfastProtein = proteinNeeded(proteinPerKilo) / 3;
		$scope.breakfastList.forEach(function(meal){
//			if(meal.protein)
		});
	}
})