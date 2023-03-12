/**
    description: Runs whenever the popup is created in a tab
**/

var addLibrary = function(library) {
    var container = document.createElement('div');
    var link = document.createElement('a');

    link.href = library.url;
    link.innerHTML = library.name;
    link.setAttribute('style', "background: transparent url('../icons/" + library.icon + ".png') no-repeat left center; background-size: contain;");
    link.target = '_blank';

    container.appendChild(link);

    if (library.version) {
        var version = document.createElement('span');

        version.innerHTML = ' ' + library.version;
        container.appendChild(version);

        var latestVersion = document.createElement('span');
        latestVersion.innerHTML = '';
        latestVersion.style.color = 'green';

        // Fetch the latest version of the library from a package registry
        library.name = library.name.toLowerCase();

        //Manual Checks
        thisLibraryURL = 'https://registry.npmjs.org/' + library.name;
        if (library.name == "jqueryui"){
            thisLibraryURL = "https://registry.npmjs.org/jquery-ui";
        }
        if (library.name == "jquerytools"){
            thisLibraryURL = "https://registry.npmjs.org/@types/jquery.tools";
        }
        if (library.name == "zurb"){
            thisLibraryURL = "https://registry.npmjs.org/foundation-sites";
        }
        if (library.name == "flotcharts"){
            thisLibraryURL = "https://registry.npmjs.org/flot";
        }
        if (library.name == "google maps"){
            thisLibraryURL = "https://registry.npmjs.org/@googlemaps/js-api-loader";
        }
        if (library.name == "closure library"){
            thisLibraryURL = "https://registry.npmjs.org/google-closure-library";
        }
        if (library.name == "rapha&euml;l"){
            thisLibraryURL ="https://registry.npmjs.org/raphael";
        }
        if (library.name == "grapha&euml;"){
            thisLibraryURL ="https://registry.npmjs.org/graphael";
        }
        if (library.name == "velocity.js"){
            thisLibraryURL ="https://registry.npmjs.org/velocity-animate";
        }
        if (library.name == "greensock js"){
            thisLibraryURL ="https://registry.npmjs.org/gsap";
        }
        if (library.name == "marionette"){
            thisLibraryURL ="https://registry.npmjs.org/backbone.marionette";
        }
        if (library.name == "kendo ui"){
            thisLibraryURL ="https://registry.npmjs.org/@progress/kendo-angular-intl";
        }
        if (library.name == "shopify"){
            thisLibraryURL ="https://registry.npmjs.org/shopify-buy";
        }
        if (library.name == "wordpress"){
            thisLibraryURL ="https://api.wordpress.org/core/version-check/1.7";
        }
        if (library.name == "guess.js"){
            thisLibraryURL ="https://registry.npmjs.org/guess-parser";
        }
        if (library.name == "october cms"){
            thisLibraryURL ="https://registry.npmjs.org/october";
        }

        console.log(thisLibraryURL);
    
        fetch(thisLibraryURL)
            .then(response => response.json())
            .then(data => {

                var latestVersionNumber;
                // Get the latest version number from the response data
                if (library.name == "wordpress"){
                    latestVersionNumber = data.offers[0].current;
                }else{
                    latestVersionNumber = data['dist-tags'].latest;
                }
                
                console.log(library.name);
                console.log(latestVersionNumber);
                

                // If the latest version is different from the library version, update the version text
                if ((library.version != latestVersionNumber) && (library.version < latestVersionNumber)) {
                    version.innerHTML = ' ' + library.version + ' (outdated, latest: ' + latestVersionNumber + ')';
                    version.style.color = 'red';
                } else if (library.version == latestVersionNumber) {
                    version.innerHTML = ' ' + library.version + ' (latest)';
                    version.style.color = 'green';
                }else{
                    version.innerHTML = ' ' + library.version;
                }
        });
    }

    document.getElementById('libraries').appendChild(container);
};

var handlePageLoad = function() {
    chrome.tabs.getSelected(null, function(tab) {
        var libraries = JSON.parse(localStorage.getItem('libraries_'+tab.id));
        if (libraries === null) return;
        for (var i=0, j=libraries.length; i < j; i++) {
            addLibrary(libraries[i]);
        }
    });
};

window.addEventListener("load", handlePageLoad, false);
