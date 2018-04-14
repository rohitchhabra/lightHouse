if (typeof Array.prototype.clean != 'function') {
    Array.prototype.clean = function (deleteValue) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == deleteValue) {
                this.splice(i, 1);
                i--;
            }
        }
        return this;
    };
}
if (typeof String.prototype.startsWith != 'function') {
    // see below for better implementation!
    String.prototype.startsWith = function (str) {
        return this.indexOf(str) == 0;
    };
}
function isEmail(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
}
(function ($) {
    //filter ajax module
    var filterlist = {
        price_range: ("#f_price_range"),
        brand: ("#f_brand"),
        material: ("#f_material"),
        range: ("#f_Range"),
        sort: ("#f_Sort")
    },
        input_type = ("input[type='checkbox']"),
        fullList = $.map(filterlist, function (value, index) {
            return [value];
        }).join(","),
       checkSelect = $(fullList).find(input_type), ajax_state = {};
    $(document).ready(function () {
        var currentRequest = null, C_URL = location.pathname;
        $(checkSelect).on("click", function (e) {
            var text = jQuery(this).val(),
                        querystring = form_query_string();
            currentRequest = jQuery.ajax({
                type: 'GET',
                data: querystring,
                url: '/Ajax_handler.ashx?AjaxFor=filter&url=' + $("#hdn_product_url").val(),
                beforeSend: function () {
                    if (currentRequest != null) {
                        currentRequest.abort();
                    }
                    show_loader();
                },
                success: function (data) {
                    //  $('#data').html(data).show();
                    if (typeof data.client_request_status != 'undefined' && data.client_request_status) {
                        var ar_selected_ids = $("#filter_section :checked").map(function () { return ["#" + $(this).attr("id")] }),
                            cur_state = {
                                "view": "filter",
                                "output": data.HTML,
                                "checkedstate": jQuery.makeArray(ar_selected_ids).join(",")
                            },
                            S_id = guid(),
                            state_url = C_URL + "?" + querystring;

                        ajax_state[S_id] = cur_state;
                        modify_state(S_id, document.title, C_URL + "?" + querystring);
                        ModFilterOutput(data.HTML);


                    }
                    hide_loader();
                    Onerrorimage();
                    lazyload();

                },
                error: function () {
                    Onerrorimage();
                }

            });
        });
        $('#f_Sort > li').click(function () {
            $('#f_Sort > li').removeClass('selected');
            $(this).addClass('selected');
            var type = jQuery(this).data('click'),
            querystring = form_query_string();
            var sortquerystring = querystring;
            currentRequest = jQuery.ajax({
                type: 'GET',
                data: sortquerystring,
                url: '/Ajax_handler.ashx?AjaxFor=filter&url=' + $("#hdn_product_url").val(),
                beforeSend: function () {
                    if (currentRequest != null) {
                        currentRequest.abort();
                    }
                    show_loader();
                },
                success: function (data) {
                    //  $('#data').html(data).show();
                    if (typeof data.client_request_status != 'undefined' && data.client_request_status) {
                        var ar_selected_ids = $("#filter_section :checked").map(function () { return ["#" + $(this).attr("id")] }),
                            cur_state = {
                                "view": "filter",
                                "output": data.HTML,
                                "checkedstate": jQuery.makeArray(ar_selected_ids).join(",")
                            },
                            S_id = guid(),
                            state_url = C_URL + "?" + sortquerystring;

                        ajax_state[S_id] = cur_state;
                        modify_state(S_id, document.title, C_URL + "?" + sortquerystring);
                        ModFilterOutput(data.HTML);


                    }
                    hide_loader();
                    Onerrorimage();
                    lazyload();

                },
                error: function () {
                    Onerrorimage();
                }
            });
        });
        $('.s_category > li').click(function () {
            var allow = jQuery(this).data('allow');

            if (!allow) {
                console.log('hi');
                return;
            }
            $('.s_category > li').removeClass('selected');
            $(this).addClass('selected');
            var type = jQuery(this).data('click'),
            querystring = form_query_string();
            var sortquerystring = querystring;
            currentRequest = jQuery.ajax({
                type: 'GET',
                data: sortquerystring,
                url: '/Ajax_handler.ashx?AjaxFor=filter&url=' + $("#hdn_product_url").val(),
                beforeSend: function () {
                    if (currentRequest != null) {
                        currentRequest.abort();
                    }
                    show_loader();
                },
                success: function (data) {
                    //  $('#data').html(data).show();
                    if (typeof data.client_request_status != 'undefined' && data.client_request_status) {
                        var ar_selected_ids = $("#filter_section :checked").map(function () { return ["#" + $(this).attr("id")] }),
                            cur_state = {
                                "view": "filter",
                                "output": data.HTML,
                                "checkedstate": jQuery.makeArray(ar_selected_ids).join(",")
                            },
                            S_id = guid(),
                            state_url = C_URL + "?" + sortquerystring;

                        ajax_state[S_id] = cur_state;
                        modify_state(S_id, document.title, C_URL + "?" + sortquerystring);
                        ModFilterOutput(data.HTML);


                    }
                    hide_loader();
                    Onerrorimage();
                    lazyload();

                },
                error: function () {
                    Onerrorimage();
                }
            });
        });
    });
    function lazyload() {
        jQuery("img.lazy").lazyload({
            effect: "fadeIn",
            failurelimit: 1,
            threshold: -20
        });
    }
    function ModFilterOutput(HTML) {
        $("#product-wrapper").html(HTML);
        colorbox_popup();
    }
    function valuemapper(x) {
        return jQuery.map(x, function (value, index) {
            return value.value
        }).join(",");
    }
    function guid() {
        //http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    function modify_state(obj, title, path) {

        if (typeof (window.history.pushState) == 'function') {
            window.history.pushState(obj, title, path);
            SEO_PUSH(path);
        } else if (false) // no need for IE 9 ATM
        {
            window.location.hash = '#!' + path;
        }
    }
    window.addEventListener("popstate", function (e) {
        //console.log(e);
        var state = e.state;
        if (state == null || (!(typeof ajax_state[state] != 'undefined' && ajax_state[state] != null))) {
            window.location = document.URL;
        }
        else {
            //ajax_state[S_id] = cur_state;
            var xstate = ajax_state[state];
            ModFilterOutput(xstate.output);
            $("#filter_section input[type='checkbox']").prop("checked", false);
            $(xstate.checkedstate).prop("checked", true);

        }
    });
    function toggle_fade() {

        if ($("#product-wrapper").hasClass("disable-div")) {
            show_loader();
        }
        else {
            hide_loader();
        }
    }
    function hide_loader() {
        $("#product-wrapper").removeClass("disable-div");

        $("#wcenter").hide();
    }
    function SEO_PUSH(url) {
        //http://stackoverflow.com/questions/9628547/does-using-pushstate-instead-of-direct-links-affect-google-analytics-code
        if (typeof _gaq != 'undefined') {
            _gaq.push(['_trackPageview', url]);
        }
        else if (typeof ga != 'undefined') {
            ga('send', 'pageview', url);
        }


    }
    function show_loader() {
        $("#product-wrapper").addClass("disable-div");
        var minHeight = jQuery(window).scrollTop();
        var maxHeight = jQuery(window).height();
        var middleHeight = (maxHeight + minHeight) / 2;
        var fixed_height = 150, full_height = fixed_height + middleHeight;
        $("#wcenter").show().css("top", full_height + "px");
    }
    function form_query_string() {
        console.log($('#f_Sort > li.selected').data('click'));
        var url = "",
            price_range = valuemapper($(filterlist.price_range + " :checked")),
            brand = valuemapper($(filterlist.brand + " :checked")),
            material = valuemapper($(filterlist.material + " :checked")),
            range = valuemapper($(filterlist.range + " :checked")),
        sort = $('#f_Sort > li.selected').data('click'),
        cat = $(".s_category > li.selected").data('click') == null ? "" : $(".s_category > li.selected").data('click');
        url += "price_range=" + price_range
               + "&brand=" + brand
               + "&material=" + material
               + "&range=" + range
        + "&sort=" + sort
        + "&cat=" + cat;
        return (url);
    }
})(jQuery);
(function ($) {


    $(".cat_menu_type").on({
        mouseenter: function () {
            //console.log("mouseenter");
            $(this).parent().find("li.menutype").removeClass("selected");
            $(this).addClass("selected");
        },
        mouseleave: function () {
            // console.log("mouseleave");
            // $("#cat_menu_type li.menutype").removeClass("selected");
        },
    }, 'li.menutype');

})(jQuery); // Passes in jQuery object

jQuery(document).ready(function () {
    Onerrorimage();
    colorbox_popup();
    //flex_slider();

    $(".links-sec > ul > li > a").mouseover(function () {
        console.log('img');
        var menuhover = $(this).attr("alt");
        $(".menuimage").hide();
        $(".menuimage").each(function () {
            if ($(this).attr('alt') === menuhover) {
                $(this).show();
            }
        });

    });

});

function colorbox_popup() {
    var jQ = jQuery.noConflict(),
        onComplete = function () {
            flex_slider();
            multizoom();
            slider_hover();
        };
    jQ(".modal_popup").colorbox({
        fixed: true,
        href: function () { return jQ(this).data("ajax"); },
        onComplete: function () { colorbox_popup(); },
        onOpen: function () {
            jQ('#topheader').hide();
        },
        onClosed: function () {
            jQ('#topheader').show();
            remove_magnify_elements();
        }
    });
    jQ(".quick-view").colorbox(
        {

            href: function () { return jQ(this).data("ajax"); },
            onComplete: onComplete,
            onOpen: function () {
                jQ('#topheader').hide();
                //var a = $(document).height();
                //var b = $(window).height();
                //console.log(a,b);
                //  $('body').addClass('scollposition');
                //  $("body").css("top", "-"+a);

                var winHeight_1 = $(window).height();
                $("body").css("height", winHeight_1);
                $(window).resize(function () {
                    var winHeight_1 = $(window).height();
                    $("body").css("height", winHeight_1);
                });
                $("body").addClass("DontScroll");

            },
            onClosed: function () {
                jQ('#topheader').show();
                remove_magnify_elements();
                //  $('body').removeClass('scollposition');
                $("body").css("height", "auto");
                $("body").removeClass("DontScroll");
            },
            onLoad: function () {
                jQ("#cboxLoadedContent").html("");
            },
            fixed: true,
            height: "600px"
        }
    );
}

function remove_magnify_elements() {
    jQuery(".magnifyarea,.zoomstatus,.zoomtracker").remove();//there is some issue with the plugin hence fixing it
}
function multizoom() {
    /*
     magnifierpos: 'right',
                magnifiersize: [200, 200],
                cursorshadecolor: '#fff',
                cursorshadeopacity: 0.3,
                cursorshadeborder: '1px solid black',
                cursorshade: false,
                leftoffset: 15, //offsets here are used (added to) the width of the magnifyarea when
                rightoffset: 10 //calculating space requirements and to position it visa vis any drop shadow
                */

    jQuery('#quick_view_big_image').addimagezoom({
        zoomrange: [3, 6],
        magnifiersize: [400, 400],
        magnifierpos: 'right',

        largeimage: jQuery('#quick_view_big_image').attr('src') //<-- No comma after last option!
    });


}

function slider_hover() {
    jQuery("ul.slides img").mouseenter(function () {
        var def_img = jQuery('#quick_view_big_image').attr("src").replace(/^.*\/|\.[^.]*$/g, ''),
            h_img = jQuery(this).attr("src").replace(/^.*\/|\.[^.]*$/g, '');

        if (def_img == h_img) {
            return;
        }
        jQuery('#quick_view_big_image').attr("src", this.src);
        multizoom();
    });

    //setTimeout(function () { multizoom() }, 1000);
}
function flex_slider() {
    var span = jQuery("<span/>")
    jQuery(document).ready(function () {
        jQuery('.flexslider').flexslider({
            animation: "slide",
            animationLoop: false,
            controlNav: false,
            itemMargin: 3,
            minItems: 2,
            maxItems: 4,
            itemWidth: 75,
            slideshow: false
        }).find("img").wrap(span);
    });
}

var temp_cache;
(function ($) {
    //reference:http://jqueryui.com/autocomplete/#remote-with-cache
    $(function () {
        var cache = {};
        $("#search_box").autocomplete({
            minLength: 2,
            source: function (request, response) {
                temp_cache = cache;
                var term = request.term,
                            term_like;
                //if (term in cache) {
                if (cache.hasOwnProperty(term) || (term_like = Objecthaslikekey(cache, term))) { // have to write my cache condition here
                    // console.log(cache[term]);
                    //cache is set here return the results
                    //response( cache[ term ] );
                    if (!term_like) {
                        //console.log(cache[term]);
                        search_module(cache[term], term);
                    }
                    else {
                        //console.log(term_like);
                        search_module(term_like, term);
                    }
                    return;
                }

                $.getJSON("/Ajax_handler.ashx?AjaxFor=search", request, function (data, status, xhr) {
                    cache[term] = data;// save it in cache
                    // response(data);//
                    search_module(data, term);
                });
            }
        }).on("focusout blur", function () {

            //console.log(jQuery("li.search_click").is(":focus"));
            if (!searchwidgetlock) {
                $("#kw_search_wrapper").remove();
            }

        });
        var searchwidgetlock = false;
        jQuery('body').on({
            click: function (e) {
                window.location = "" + jQuery(this).data("click");
            },
            mouseenter: function () {
                //console.log("mouseenter");
            },
            mouseleave: function () {
                // console.log("mouseleave");
            },
        }, 'li.search_click');
        jQuery('body').on({
            mouseenter: function () {
                //console.log("mouseenter");
                searchwidgetlock = true;
            },
            mouseleave: function () {
                //console.log("mouseleave");
                searchwidgetlock = false;
            }
        }, "#kw_search_wrapper");
        function search_module($data, search_key) {
            $("#kw_search_wrapper").remove();
            var $fdata = format_data($data),
                hover_area = '<div class="hover-area"></div>',
                table_wrapper = $('<table width="100%" cellpadding="0" cellspacing="0">'),
                search_wrapper = $('<div id="kw_search_wrapper"/>'),
                tb = $("<tbody/>"),
                tr = $("<tr/>"),
                td = $("<td/>"),
                ul = $("<ul id='Kl_" + "" + "' />"),
                li = $("<li/>"),
                fhtml
            ;
            var pattern1 = '(' + search_key + ')';
            //str.match(new RegExp(pattern1, 'gi'));
            var spn = '<span class="highlight-suggestion">$1</span>';

            if ($fdata.length != 0) {
                //console.log($fdata.length);
                $.each($fdata, function (key2, item2) {

                    // var lli = li;
                    //   ul.append(lli.html(item2.title));

                    ul.append(li
                                .clone().addClass("search_click")
                                .html(
                                         item2
                                        .title
                                        .replace(
                                                    new RegExp(pattern1, 'gi'), spn
                                                 )
                                      )
                        .attr("data-click", item2.url));
                    if (item2.cat != null) {
                        $.each(item2.cat, function (key3, item3) {
                            //console.log(key3, item3);
                            var space = "&nbsp;&nbsp;&nbsp;&nbsp;";
                            var mod_item = 'in <span class="highlight-suggestion-vertical">' + item3.title + '</span>';
                            //ul.append(li.clone().html(space + mod_item.replace(search_key, spn)));
                            ul.append(li.clone().addClass("search_click").html(space + mod_item).attr("data-click", item3.url));
                        });
                    }
                });
            }
            else {
                //console.log($fdata.length);
                ul.append(li
                                .clone().attr("style", "text-align: center;").html(
                                         'No products found matching your search criteria..'
                                      ));
            }
            $("#search_box").before(search_wrapper.append(ul)).on("focusin,focus", function () { $(this).trigger("change") });
            //$("#kw_search_wrapper").html("");
            $(document).on('click', '.search_click', function () {

                $("#search_box").val($(this).text());
            });
            $("#search_box").keydown(function (e) {

                var searchbox = $(this);
                switch (e.keyCode) {
                    case 40:
                        console.log('1');
                        $('#kw_search_wrapper').has('#Kl_').has('li').addClass('search_click');
                        break;
                    case 38:
                        //  $('li:not(:first-child).search_click').removeClass('search_click').prev().addClass('search_click');
                        $('#kw_search_wrapper').has('#Kl_').has('li').removeClass('search_click').next().addClass('search_click');
                        break;
                }
            });

        }
        function format_data($data) {

            return $data;
        }
        function starts_with(str, has) {
            str.toLowerCase().indexOf(has) >= 0
        }
        function Objecthaslikekey(data, startkey) {
            for (var k in data) {
                //console.log(k);
                if (data.hasOwnProperty(k) && k.startsWith(startkey)) {
                    //user[k] = data[k];
                    return data[k];
                }
            }
            return false;
        }
    });

})(jQuery); // Passes in jQuery object
(function ($) {
    //  $(".image-cycle").on("mouseenter", function (e) { alert(1); });
    var isCycle = false, delimit = ",", refreshIntervalId = 0;
    $(".image-cycle").on({
        mouseenter: function () {
            var data_url = 'http://admin.Kalanjiamhardwares.com/';
            var all_images = $(this).data("images").replace(/%cache%/g, data_url).split(delimit),
                bind_element = $(this).find("img");
            var imgurl = encodeURIComponent(all_images);
            all_images = all_images.clean("");
            CycleImages(all_images, bind_element);
        },
        mouseleave: function () {
            var first_image = $(this).data("images").split(delimit)[0],
                bind_element = $(this).find("img"),
                original_images = $(this).data("original");
            disableCycle(first_image, original_images, bind_element);
        },
    });
    function CycleImages(images, img_element) {
        // alert();
        var img_pointer = 0, img_count = images.length;
        if (images.length > 1) {
            img_pointer = 1;
        }
        refreshIntervalId = setInterval(function () {
            img_element.attr("src", images[img_pointer]);
            img_pointer++;
            if ((img_pointer == (img_count))) {
                img_pointer = 0;
            }
        }, 1000);
    }
    function disableCycle(first_image, original_images, img_element) {
        if (refreshIntervalId != 0) {
            clearInterval(refreshIntervalId);
            refreshIntervalId = 0;
            img_element.attr("src", original_images);
        }
    }
})(jQuery);

function Onerrorimage() {
    (function ($) {
        $("img").on("error", function (e) {
            this.src = "/images/no_picture_available.gif";
        });
    })(jQuery);
}
function img_onerror(obj) {
    obj.src = "/images/no_picture_available.gif";
}
function HighlightControlToValidate() {
    if (typeof (Page_Validators) != "undefined") {
        for (var i = 0; i < Page_Validators.length; i++) {
            $('#' + Page_Validators[i].controltovalidate).blur(function () {
                var validatorctrl = getValidatorUsingControl($(this).attr("ID"));
                if (validatorctrl == null || !validatorctrl.isvalid) {
                    //var aaru = '#F00';
                    $(this).addClass("ErrorControl");
                }
                else {
                    $(this).removeClass("ErrorControl");
                }
            });
        }
    }
}
function getValidatorUsingControl(controltovalidate) {
    var length = Page_Validators.length;
    for (var j = 0; j < length; j++) {
        if (Page_Validators[j].controltovalidate == controltovalidate) {
            return Page_Validators[j];
        }
    }
    return null;
}

/******/

$(document).ready(function () {


    var $input = $('#search_box'),
        current_index = $('.search_click').index(),
        $number_list = $('#kw_search_wrapper'),
        $options = $number_list.find('li'),
        items_total = $options.length;

    $input.bind('keyup', function (e) {
        if (e.keyCode == 40) {
            if (current_index + 1 < items_total) {
                current_index++;
                change_selection();
            }
        } else if (e.keyCode == 38) {
            if (current_index > 0) {
                current_index--;
                change_selection();
            }
        }
    });

    function change_selection() {
        $options.removeClass('selected_123');
        $options.eq(current_index).addClass('selected_123');
        // $input.val(current_index);
    }

});

/*$("#search_box").keydown(function (e) {
    if (e.keyCode == 40) {
        //alert("arrowkey pressed");
        $("#kw_search_wrapper .search_click:first-child").focus().addClass("aaru");

    }
  if () {
        alert("arrowkey pressed");
        //$("#kw_search_wrapper .search_click").removeClass("aaru");
        //$(this).next().addClass("aaru");
    }
    
});*/



/*$('#search_box').keydown(function (e) {
    if (e.keyCode == 40) {
        $("#kw_search_wrapper .search_click:first-child").addClass("aaru");
    }
});

$('#kw_search_wrapper .search_click').keydown(function (e) {
    if (e.keyCode == 40) {
        $("#kw_search_wrapper .search_click").removeClass("aaru");
        $(this).next().addClass("aaru")
    }
});*/