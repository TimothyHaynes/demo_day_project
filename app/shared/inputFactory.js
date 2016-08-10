var app = angular.module('myApp');

app.factory('inputFactory', function() {
    var intial = {};

    //passes the info through from the searchController and saves to object
    // --> user input is being stored here
    function saveObject(searchInput) {
        intial = searchInput;
        console.log(intial);
    }

    //returns the object of the passed through info from the page
    function returnObject() {
        return intial;
    }

    // returns the emtpy object from before with the two new key:value pairs with the vlaues as functions which are declared on lines 5 and 10
    return {
        saveObject: saveObject,
        returnObject: returnObject
    };
});
