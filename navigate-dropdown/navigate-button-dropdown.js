(function ($) {
    $.fn.navigateDropdown = function () {
        var settings = $.extend({
            activeElementClass: "active-dd-element",
            ulSearchFilter: "ul.dropdown-menu"
        });

        $(this).on('shown.bs.dropdown', function () {
            $(this).on("keypress", function (e) {
                var keyChar = String.fromCharCode(event.keyCode),
                    $ul = $(this).find(settings.ulSearchFilter),
                    $selectedItem = $ul.find('li>a').filter(function () {
                        return $(this).text().toLowerCase().indexOf(keyChar.toLowerCase()) === 0;
                    }).first(),
                position = $selectedItem.position().top - $ul.find("li:first").position().top;
                $ul.find("li>a").filter(function () {
                    if ($(this).hasClass(settings.activeElementClass)) { $(this).removeClass(settings.activeElementClass) }
                })
                $ul.animate({ scrollTop: position })
                $selectedItem.addClass(settings.activeElementClass);
            });
        }).on("hidden.bs.dropdown", function () {
            $(this).find(settings.ulSearchFilter).find("li>a").filter(function () {
                if ($(this).hasClass(settings.activeElementClass)) { $(this).removeClass(settings.activeElementClass); }
            });
            $(this).off("keypress");
        });

        return this;
    };
}(jQuery))