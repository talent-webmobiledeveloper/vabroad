document.observe("dom:loaded",function(e){var s={".chosen-select":{},".chosen-select-deselect":{allow_single_deselect:!0},".chosen-select-no-single":{disable_search_threshold:10},".chosen-select-no-results":{no_results_text:"Oops, nothing found!"},".chosen-select-rtl":{rtl:!0},".chosen-select-width":{width:"95%"}};for(var n in s)$$(n).each(function(e){new Chosen(e,s[n])})});