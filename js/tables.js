var tableId = '';
var current = 1;
var last;

//Table fills the HTML table and adds pagination search and sorting
//table is the tables id, number is the initial pagination number, content is the json to be added to the table
function table(table, number, content) {
    //loop for all elements in JSON['data'] and add to table
    tableId = table;
    $("#"+tableId+' tbody').html('');
    for (var i = 0; i < content['recordsTotal']; i++) {
        var write = "<tr class='tableRows' id='" + content['data'][i][0] + "'>";
		write += '<td><input type="checkbox" value="' + content['data'][i][0] + '"></td>';
        for (var j = 1; j < content['data'][i].length; j++) {
            write += '<td>' + content['data'][i][j] + '</td>';
        }
        write += '</tr>';
        $("#"+tableId+' tbody').append(write);
    }
    //add custom sort "date"
    $("#" + table).stupidtable().tableSearch({searchPlaceHolder: 'Search Table'}).tablePaginate({recordPerPage: number});
    navigation();
}

//Update an existing table content is content to add
function tableUpdate(content) {
    for (var i = 0; i < content['recordsTotal']; i++) {
        if (document.getElementById(content['data'][i][0]) !== '') {
            var write = "<tr class='tableRows' id='" + content['data'][i][0] + "'>";
            for (var j = 0; j < content['data'][i].length; j++) {
                write += '<td>' + content['data'][i][j] + '</td>';
            }
            write += '</tr>';
            $("#"+tableId+' tbody').append(write);
        } else {
        }
    }

    //remove duplicated elements
    $('[id]').each(function () {
        $('[id="' + this.id + '"]:gt(0)').remove();
    });

    //reset pagination and page values
    $("#" + tableId).tablePaginate({recordPerPage: $("#size").val(), pageNumber: current});
    $('#all').val($('.tableRows').length);
    last = Math.ceil($('.tableRows').length / parseInt($("#size").val()));
    $("#pageNumber").html('Page # ' + current + ' of ' + last);
}

//add pagination navigation and allow search to function properly
function navigation() {
    $('#all').val($('.tableRows').length);
    last = Math.ceil($('.tableRows').length / parseInt($("#size").val()));
    $("#pageNumber").html('Page # ' + current + ' of ' + last);
    $('.nav').on('click', function () {
        var navigateTo = this.id;
        switch (navigateTo) {
            case "first":
                current = 1;
                $("#" + tableId).tablePaginate({recordPerPage: $("#size").val(), pageNumber: current});
                break;
            case "last":
                current = last;
                $("#" + tableId).tablePaginate({recordPerPage: $("#size").val(), pageNumber: current});
                break;
            case "next":
                if (current === last) {
                    current = last;
                } else {
                    current += 1;
                }
                $("#" + tableId).tablePaginate({recordPerPage: $("#size").val(), pageNumber: current});
                break;
            case "prev":
                if (current === 1) {
                    current = 1;
                } else {
                    current -= 1;
                }
                $("#" + tableId).tablePaginate({recordPerPage: $("#size").val(), pageNumber: current});
                break;
        }
        $("#pageNumber").html('Page # ' + current + ' of ' + last);
    });
    $("#size").on('change', function () {
        last = Math.ceil($('.tableRows').length / parseInt($("#size").val()));
        if (current > last) {
            current = last;
        }
        $("#pageNumber").html('Page # ' + current + ' of ' + last);
        $("#" + tableId).tablePaginate({recordPerPage: $("#size").val(), pageNumber: current});
    });
    $("#searching").on("keyup", function () {
        last = Math.ceil($('.tableRows').length / parseInt($("#size").val()));
        if (current === 0) {
            current++;
        }
        if (current > last) {
            current = last;
        }
        $("#pageNumber").html('Page # ' + current + ' of ' + last);
        $("#" + tableId).tablePaginate({recordPerPage: $("#size").val(), pageNumber: current});
        if ($("#searching").val() === '') {
            if (current === 0) {
                current++;
            }
            $("#" + tableId).tablePaginate({recordPerPage: $("#size").val(), pageNumber: current});
        }
    });
}

// Table Search
(function ($) {
    $.fn.tableSearch = function (options) {
        if (!$(this).is('table')) {
            return;
        }
        var tableObj = $(this),
                searchText = (options.searchText) ? options.searchText : ' ',
                searchPlaceHolder = (options.searchPlaceHolder) ? options.searchPlaceHolder : '',
                divObj = $('<div style="float:right;">' + searchText + '</div><br /><br />'),
                inputObj = $('<input class="form-control" style="margin-top:5px;" type="text" id="searching" placeholder="' + searchPlaceHolder + '" />'),
                searchFieldVal = '',
                pattern = '';
        inputObj.off('keyup').on('keyup', function () {
            searchFieldVal = $(this).val();
            pattern = RegExp(searchFieldVal, 'i');
            tableObj.find('tbody tr').hide().removeClass('tableRows').each(function () {
                var currentRow = $(this);
                currentRow.find('td').each(function () {
                    if (pattern.test($(this).html())) {
                        currentRow.show().addClass('tableRows');
                        return false;
                    }
                });
            });
        });
        tableObj.before(divObj.append(inputObj));
        return tableObj;
    };
}(jQuery));
// Stupid jQuery table plugin.
(function ($) {
    $.fn.stupidtable = function (sortFns) {
        return this.each(function () {
            var $table = $(this);
            sortFns = sortFns || {};
            sortFns = $.extend({}, $.fn.stupidtable.default_sort_fns, sortFns);
            $table.data('sortFns', sortFns);
            $table.on("click.stupidtable", "thead th", function () {
                $(this).stupidsort();
            });
        });
    };
    // Expects $("#mytable").stupidtable() to have already been called.
    // Call on a table header.
    $.fn.stupidsort = function (force_direction) {
        var $this_th = $(this);
        var th_index = 0; // we'll increment this soon
        var dir = $.fn.stupidtable.dir;
        var $table = $this_th.closest("table");
        var datatype = $this_th.data("sort") || null;
        // No datatype? Nothing to do.
        if (datatype === null) {
            return;
        }
        // Account for colspans
        $this_th.parents("tr").find("th").slice(0, $(this).index()).each(function () {
            var cols = $(this).attr("colspan") || 1;
            th_index += parseInt(cols, 10);
        });
        var sort_dir;
        if (arguments.length === 1) {
            sort_dir = force_direction;
        } else {
            sort_dir = force_direction || $this_th.data("sort-default") || dir.ASC;
            if ($this_th.data("sort-dir"))
                sort_dir = $this_th.data("sort-dir") === dir.ASC ? dir.DESC : dir.ASC;
        }
        $table.trigger("beforetablesort", {column: th_index, direction: sort_dir});
        // More reliable method of forcing a redraw
        $table.css("display");
        // Run sorting asynchronously on a timout to force browser redraw after
        // `beforetablesort` callback. Also avoids locking up the browser too much.
        setTimeout(function () {
            // Gather the elements for this column
            var column = [];
            var sortFns = $table.data('sortFns');
            var sortMethod = sortFns[datatype];
            var trs = $table.children("tbody").children("tr");
            // Extract the data for the column that needs to be sorted and pair it up
            // with the TR itself into a tuple. This way sorting the values will
            // incidentally sort the trs.
            trs.each(function (index, tr) {
                var $e = $(tr).children().eq(th_index);
                var sort_val = $e.data("sort-value");
                // Store and read from the .data cache for display text only sorts
                // instead of looking through the DOM every time
                if (typeof (sort_val) === "undefined") {
                    var txt = $e.text();
                    $e.data('sort-value', txt);
                    sort_val = txt;
                }
                column.push([sort_val, tr]);
            });
            // Sort by the data-order-by value
            column.sort(function (a, b) {
                return sortMethod(a[0], b[0]);
            });
            if (sort_dir != dir.ASC)
                column.reverse();
            // Replace the content of tbody with the sorted rows. Strangely
            // enough, .append accomplishes this for us.
            trs = $.map(column, function (kv) {
                return kv[1];
            });
            $table.children("tbody").append(trs);
            // Reset siblings
            $table.find("th").data("sort-dir", null).removeClass("sorting-desc sorting-asc");
            $this_th.data("sort-dir", sort_dir).addClass("sorting-" + sort_dir);
            $table.trigger("aftertablesort", {column: th_index, direction: sort_dir});
            $table.css("display");
            $("#" + tableId).tablePaginate({recordPerPage: $("#size").val(), pageNumber: current});
        }, 10);
        return $this_th;
    };
    // Call on a sortable td to update its value in the sort. This should be the
    // only mechanism used to update a cell's sort value. If your display value is
    // different from your sort value, use jQuery's .text() or .html() to update
    // the td contents, Assumes stupidtable has already been called for the table.
    $.fn.updateSortVal = function (new_sort_val) {
        var $this_td = $(this);
        if ($this_td.is('[data-sort-value]')) {
            // For visual consistency with the .data cache
            $this_td.attr('data-sort-value', new_sort_val);
        }
        $this_td.data("sort-value", new_sort_val);
        return $this_td;
    };
    // ------------------------------------------------------------------
    // Default settings
    // ------------------------------------------------------------------
    $.fn.stupidtable.dir = {ASC: "asc", DESC: "desc"};
    $.fn.stupidtable.default_sort_fns = {
        "int": function (a, b) {
            return parseInt(a, 10) - parseInt(b, 10);
        },
        "float": function (a, b) {
            return parseFloat(a) - parseFloat(b);
        },
        "string": function (a, b) {
            return a.localeCompare(b);
        },
        "string-ins": function (a, b) {
            a = a.toLocaleLowerCase();
            b = b.toLocaleLowerCase();
            return a.localeCompare(b);
        }
    };
})(jQuery);
//Table Paginate
(function ($) {
    $.fn.extend({
        tablePaginate: function (options) {
            var defaults = {
                recordPerPage: 20, // Display records per page
                pageNumber: 1, // GoTo Pagenumber - Default : 1
                fullData: false, // True : Disable pagination, False - Enable Pagination
                navigateType: 'navigator'// navigator (first,prev,next,last buttons), full (display page numbers)
            };
            var options = $.extend(defaults, options);
            var el = this;
            // GET total Records length
            var totalRecords = $(el).find('tbody').find('tr').length;
            // Pagination off
            if (defaults.fullData == 'true') {
                defaults.pageNumber = 1;
                defaults.recordPerPage = totalRecords;
            }
            // Identify Start & End values
            var end = defaults.pageNumber * defaults.recordPerPage;
            var start = end - defaults.recordPerPage;
            // Display records based on pagination settings
            $(el).find('tbody').find('.tableRows').each(function (rowIndex, data) {
                $(this).hide();
                if (start <= rowIndex && end > rowIndex) {
                    $(this).show();
                }
            });
        }
    });
}
)(jQuery);
