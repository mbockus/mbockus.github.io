/************
 Demos
 ************/

var $description = $("#description");

/* Blast undo button. */
function showUndoButton () {
    $("#btnUndo").fadeIn(500)
}

$("#btnUndo").on("click", function () {
    $description.blast(false);
    $(this).fadeOut(500);
});

/* Delimiter buttons. */
$("#buttons input[type='button']").on("click", function () {
    var $this = $(this),
        delimiter,
        $generatedElements;

    if ($this.attr("id") === "btnUndo") {
        return true;
    } else {
        showUndoButton();
    }

    $this
        .addClass("btnClicked")
        .siblings()
        .removeClass("btnClicked");

    if ($this.attr("name") === "search") {
        delimiter = $.trim($("#buttons #textBtnSearch").val()) || "blast";

        $generatedElements = $description.blast( { search: delimiter } );
    } else {
        delimiter = $this.attr("name");

        $generatedElements = $description.blast( { delimiter: delimiter } );
    }

    /* Fade in a background-color for search results. */
    if ($this.attr("name") === "search") {
        $generatedElements
            .css({
                backgroundColor: "rgba(223, 231, 236, 0)",
                transition: "color 400ms"
            })
            .velocity(
            {
                backgroundColorAlpha: 1
            }, {
                duration: 400
            });
    }

    /* Alternate colors between generated elements. */
    $generatedElements
        .filter(":even")
        .css("color", "#0c5d99")
        .end()
        .filter(":odd")
        .css("color", "#dd1f7b");
});

/* Event bindings for the sample button. */
$description.find("#btnSample").on("click", function () {
    alert("This click event is bound directly.");
});

$("body").on("click", "#btnSample", function () {
    alert("This click event is bound to a parent element.");
});

/* Demos. */
$("#description > li a").on("click", function () {
    showUndoButton();

    switch ($(this).attr("id")) {
        case "btnTypographicAnimation":
            $("li").eq(0).blast()
                .velocity("fadeOut", { duration: 350, stagger: 30, drag: true, backwards: true, display: null, complete: function() {
                    $("li").eq(0).find(".blast")
                        .velocity("fadeIn", { delay: 500, stagger: 30, drag: true })
                        .velocity("transition.slideDownIn", { delay: 1000, stagger: 20, drag: true, display: "inline-block", complete: function() {
                            $("li").eq(0).blast(false);
                            $("#btnUndo").trigger("click");
                        }
                        });
                }
                })
            break;

        case "btnStylingDemo":
            $description
                .blast({ delimiter: "word" })
                .each(function (i) {
                    $(this).css({ opacity: i / (3.5 * 100) });
                });

            alert("The styling demo separates text using the word delimiter then iteratively increases the opacity of each word. Because no special CSS3 gradient properties are being used to achieve this fading effect, it works across all browsers -- all the way back to IE6.");
            break;

        case "btnJuxtapositionDemo":
            var phraseLetters = (prompt("Enter your first name:").toLowerCase().replace(/\s/g, "") || "blast").split(""),
                letterMatchCount = 0;

            $description
                .blast({ delimiter: "character" })
                .each(function () {
                    var element = this;

                    $.each(phraseLetters, function (i, letter) {
                        if (element.innerHTML === letter) {
                            phraseLetters[i] = false;
                            letterMatchCount++;

                            $(element)
                                .attr("juxtaposition-demo-index", i)
                                .css({
                                    position: "fixed",
                                    color: "rgb(0, 125, 255)"
                                })
                                .velocity({ fontSize: "45px" }, { duration: 350 });

                            return false;
                        }

                        if (letterMatchCount === phraseLetters.length) {
                            return false;
                        }
                    });
                });

            if (letterMatchCount !== phraseLetters.length) {
                alert("Sorry, couldn't match all the letters in your name.");
            } else {
                var fontSizeOriginal = $description.css("font-size"),
                    documentWidth = document.body.offsetWidth,
                    documentHeight = document.body.clientHeight;

                $.each(phraseLetters, function(i, letter) {
                    $description.find("[juxtaposition-demo-index=" + i + "]").each(function () {
                        var $this = $(this),
                            offset = $this.offset();

                        $this
                            .css("display", "inline-block")
                            .delay(i * 350)
                            .velocity(
                            {
                                translateX: documentWidth/2 - offset.left - (25 * phraseLetters.length) + (i * 45),
                                translateY: 300 - offset.top
                            }, {
                                duration: 750
                            }
                        )
                            .delay(2250)
                            .velocity(
                            {
                                translateX: 0,
                                translateY: 0
                            }, {
                                complete: function() {
                                    $this
                                        .css({
                                            display: "inline",
                                            position: "static",
                                            color: "inherit"
                                        })
                                        .velocity({ fontSize: fontSizeOriginal }, {
                                            duration: 1000,
                                            complete: function() {
                                                if (i === phraseLetters.length - 1) {
                                                    $("#btnUndo").trigger("click");
                                                }
                                            }
                                        });
                                }
                            }
                        );
                    });
                });
            }
            break;

        case "btnSearchDemo":
            $description
                .blast({ delimiter: "word" })
                .each(function() {
                    if (Math.random() < 0.075) {
                        var $this = $(this);

                        $this
                            .css({
                                display: "inline-block",
                                backgroundColor: "rgba(255, 255, 0, 0.85)"
                            })
                            .velocity({ scaleX: 2, scaleY: 2, translateZ: 0 }, { duration: 1500 })
                            .velocity("reverse", {
                                complete: function() {
                                    $this
                                        .css({
                                            display: "inline",
                                            backgroundColor: "transparent"
                                        })
                                        .blast(false);

                                    $("#btnUndo").trigger("click");
                                }
                            });
                    }
                });
            break;

        case "btnAnalysisDemo":
            var longSentenceCount = 0;

            showUndoButton();

            alert("The analysis demo color-fills each sentence to provide a visual overview of your page's text density.");

            $description
                .blast({ delimiter: "sentence" })
                .each(function(i) {
                    var $this = $(this);
                    fillColor = i % 2 ? "#262626" : "#dadada";

                    $this.css({ color: fillColor, backgroundColor: fillColor });

                    if ($this.html().length > 150) {
                        longSentenceCount++;
                    }
                });

            alert("Results: " + longSentenceCount + " sentences are over 150 characters. Consider trimming them for increased legibility.\r\n\r\nClick the Undo button (below) to remove the color-fills.");
            break;
    }
});