$(document).ready(function(){
    var hour;
    var timeInterval;

    // header section
    // display time and update every second
    timeInterval = setInterval(function(){
        // display day of week
        $('#day-display').text(moment().format('dddd'));
        // display time of day
        $('#time-digits').text(moment().format('h:mm'));
        // display am / pm for style purposes
        $('#time-period').text(moment().format('a'));

        // save time to variable
        hour = parseInt(moment().format('H'));
        var minutes = parseInt(moment().format('mm'));

        // timeblocks
        if (hour < 0){
            $('.time-block').removeClass("present past").addClass("future");
        }
        if (hour > 11){
            $('.time-block').removeClass("present future").addClass("past");
        }
        $( "div.time-block" ).each(function() {
            var timeblockNum = parseInt($( this ).data("value"));
            if (hour < timeblockNum){
                $( this ).removeClass("past present").addClass("future");
            }
            if (hour === timeblockNum){
                $( this ).removeClass("past future").addClass("present");
            }
            if (hour > timeblockNum){
                $( this ).removeClass("present future").addClass("past");
            }
        });

        // current time display
        if (hour > 11 || hour < 0){
            $('#current-time').css("display", "none");
        } else {
            $('#current-time').css("display", "grid");
        }

        // current time line position
        var position = ((hour * 100) - 2) + (minutes * 1.65);
        $('#current-time').css('top', position+'px');
    }, 100);

    // timeblocks object
    var blocks = {
        block0: {
            time: "12AM - 1AM",
            title: "",
            description: ""
        },
        block1: {
            time: "1AM - 2AM",
            title: "",
            description: ""
        },
        block2: {
            time: "2AM - 3AM",
            title: "",
            description: ""
        },
        block3: {
            time: "3AM - 4AM",
            title: "",
            description: ""
        },
        block4: {
            time: "4AM - 5AM",
            title: "",
            description: ""
        },
        block5: {
            time: "5AM - 6AM",
            title: "",
            description: ""
        },
        block6: {
            time: "6AM - 7AM",
            title: "",
            description: ""
        },
        block7: {
            time: "7AM - 8AM",
            title: "",
            description: ""
        },
        block8: {
            time: "8AM - 9AM",
            title: "",
            description: ""
        },
        block9: {
            time: "9AM - 10AM",
            title: "",
            description: ""
        },
        block10: {
            time: "10AM - 11AM",
            title: "",
            description: ""
        },
        block11: {
            time: "11AM - 12AM",
            title: "",
            description: ""
        },

        
        block12: {
            time: "12AM - 1PM",
            title: "",
            description: ""
        },
        block13: {
            time: "1PM - 2PM",
            title: "",
            description: ""
        },
        block14: {
            time: "2PM - 3PM",
            title: "",
            description: ""
        },
        block15: {
            time: "3PM - 4PM",
            title: "",
            description: ""
        },
        block16: {
            time: "4PM - 5PM",
            title: "",
            description: ""
        },
        block17: {
            time: "5PM - 6PM",
            title: "",
            description: ""
        },block18: {
            time: "6PM - 7PM",
            title: "",
            description: ""
        },block19: {
            time: "7PM - 8PM",
            title: "",
            description: ""
        },block20: {
            time: "8PM - 9PM",
            title: "",
            description: ""
        },
        block21: {
            time: "9PM - 10PM",
            title: "",
            description: ""
        },
        block22: {
            time: "10PM - 11PM",
            title: "",
            description: ""
        },
        block23: {
            time: "11PM - 12PM",
            title: "",
            description: ""
        }
    };

    // LOCAL STORAGE
    var storageKey = localStorage.getItem("storageKey");
    init();

    function renderBlocks(){
        $( "div.time-block" ).each(function() {
            var timeblockNum = $( this ).attr("data-value");
            // clear old text (need when saving)
            $( this ).empty();
            // add text to timeblocks
            $( this ).append($("<h4 class='title'>"+blocks["block"+timeblockNum].title+"</h4>"));
            $( this ).append($("<p class='description'>"+blocks["block"+timeblockNum].description+"</p>"));
            if (blocks["block"+timeblockNum].title!=="" || blocks["block"+timeblockNum].description!==""){
                $( this ).removeClass("empty");
            }
        });
    };

    function init() {
        // check if local storage has been used else get data from local storage
        if(storageKey===null){
            console.log("nothing in storage");
        } else {
            blocks = JSON.parse(localStorage.getItem("storageKey"));
        }
        // Render event text
        renderBlocks();
    };

    function storeBlocks() {
        // store timeblock objects in local storage
        localStorage.setItem("storageKey", JSON.stringify(blocks));
    };

    // declare variables for functions
    var blockNum;

    // display form and info for selected time block
    function addText(timeblockdiv){
        // get the selected time block number from the div.time-block data-value
        blockNum = ( $( timeblockdiv ).attr("data-value")).toString();
        // display values for selected timeblock in form
        $('#form-time').text(blocks["block"+blockNum].time);
        $('#title').val(blocks["block"+blockNum].title);
        $('#description').val(blocks["block"+blockNum].description);
    };

    // EVENTS
    // timeblock on click display form
    $('.time-block').on("click", function(){
        // display form
        $('#text-form').css('display', 'block');
        addText(this);
    });

    // close button
    $('#close').on("click", function(){
        $('#text-form').css('display', 'none');
    });

    // save button
    $('#save').on("click", function(event){
        event.preventDefault();
        // get values from form and add to blocks object
        blocks["block"+blockNum].title = $('#title').val();
        blocks["block"+blockNum].description = $('#description').val();
        storeBlocks();
        renderBlocks();
        // close form pop up
        $('#text-form').css('display', 'none');
    });
});
