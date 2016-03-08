function initPromotions($scope) {
    var spreadsheetId = '1PbyuaPvDU3rNBECnloFwmp_0WR0l-Cvi8P-xCgi9eAY';
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://spreadsheets.google.com/feeds/list/' + encodeURIComponent(spreadsheetId) + '/od6/public/values?alt=json', true);
    xhr.send();
    xhr.onload = function() {
        var promotions = [];
        var resp = JSON.parse(this.response);
        var items = resp.feed.entry;
        for (var i = 0; i < items.length; i++) {
            var promotion = {};
            var item = items[i];
            promotion.title = item.gsx$title.$t;
            var options = {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            };
            promotion.startDate = item.gsx$startdate.$t == "" ? "" : new Date(item.gsx$startdate.$t).toLocaleDateString('en-US', options);
            promotion.endDate = item.gsx$enddate.$t == "" ? "" : new Date(item.gsx$enddate.$t).toLocaleDateString('en-US', options);
            promotion.categories = item.gsx$categories.$t == "" ? null : item.gsx$categories.$t.split(",");
            promotion.description = item.gsx$description.$t;
            promotion.image = item.gsx$image.$t == "" ? null : "http://drive.google.com/uc?id=" + item.gsx$image.$t;
            promotions.push(promotion);
        }
        $scope.promotions = promotions;
        $scope.categories = get_categories(promotions);
        $scope.filter = init_categories($scope.categories);
        $scope.$apply();
    }
}
function initEvents($scope) {
    var calendarId = 'oh6scv8j20n4g5dhv5h7p16rh4@group.calendar.google.com';
    var apiKey = 'AIzaSyDI29U1bMeKZLbkVbbmnvRiSdxlEKn6K5I';
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://content.googleapis.com/calendar/v3/calendars/' + encodeURIComponent(calendarId) + '/events?maxResults=200&orderBy=startTime&showDeleted=false&singleEvents=true&timeMin=' + (new Date()).toISOString() + '&key=' + apiKey, true);
    xhr.send();
    xhr.onload = function() {
        var events = [];
        var resp = JSON.parse(this.response);
        var items = resp.items;
        for (var i = 0; i < items.length; i++) {
            var event = {};
            var item = items[i];
            event.title = item.summary;
            event.location = item.location;
            var options = {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            };
            var dateTime = new Date(item.start.dateTime);
            event.date = dateTime.toLocaleDateString('en-US', options);
            event.time = dateTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
            var json = JSON.parse(item.description);
            event.categories = json.categories;
            event.description = json.description;
            try {
                event.image = "http://drive.google.com/uc?id=" + json.image.id;
            } catch (e) {}
            events.push(event);
        }
        $scope.events = events;
        $scope.categories = get_categories(events);
        $scope.filter = init_categories($scope.categories);
        $scope.$apply();
    }
}
function get_categories(items) {
    var out = [];
    for (i in items) {
        var item = items[i];
        outer_block:
            for (j in item.categories) {
                var category = item.categories[j];
                for (k in out) {
                    if (category == out[k]) {
                        break outer_block;
                    }
                }
                out.push(category);
            }
    }
    return out;
}
function init_categories(categories) {
    var out = {};
    for (var i = 0; i < categories.length; i++) {
        out[categories[i]] = true;
    }
    return out;
}
var app = angular.module('app', ['ngSanitize']);
app.controller("switchController", function($scope) {
    $scope.activeClass = "events";
    $scope.getActiveClass = function(str) {
        if (str === $scope.activeClass) {
            return "activeState";
        } else {
            return "";
        }
    }
});
app.controller("promotionController", function($scope) {
    initPromotions($scope);
    $scope.filterByCategory = function(promotion) {
        var categories = promotion.categories;
        for (i in categories) {
            if ($scope.filter[categories[i]] == true) {
                return true;
            }
        }
        return false;
    };
    $scope.uncheck_all = function() {
        $scope.filter = {};
    }
    $scope.check_all = function() {
        $scope.filter = init_categories($scope.categories);
    }
});
app.controller("eventController", function($scope) {
    initEvents($scope);
    $scope.filterByCategory = function(event) {
        var categories = event.categories;
        for (i in categories) {
            if ($scope.filter[categories[i]] == true) {
                return true;
            }
        }
        return false;
    };
    $scope.uncheck_all = function() {
        $scope.filter = {};
    }
    $scope.check_all = function() {
        $scope.filter = init_categories($scope.categories);
    }
});
function filterClick(ele) {
    var $scope = angular.element(ele).scope();
    $scope.uncheck_all();
    $scope.filter[ele.innerHTML] = true;
    $scope.$apply();
}
