var Lock = function () {

    return {
        //main function to initiate the module
        init: function () {

             $.backstretch([
		        "../../assets/bqcHtml/pages/media/bg/1.jpg",
    		    "../../assets/bqcHtml/pages/media/bg/2.jpg",
    		    "../../assets/bqcHtml/pages/media/bg/3.jpg",
    		    "../../assets/bqcHtml/pages/media/bg/4.jpg"
		        ], {
		          fade: 1000,
		          duration: 8000
		      });
        }

    };

}();