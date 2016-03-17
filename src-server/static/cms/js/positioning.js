$(document).ready(function() {

    var pathname = window.location.pathname.substring(1)

    $('.sortable').sortable({
        items: 'md-list-item.sort:not(.child-list-record)',
        handle: '.sortable-handle',
        forceHelperSize: true,
        forcePlaceholderSize: true,
        revert: true,
        opacity: .8,
        placeholder: 'sortable-placeholder',
        update: function(event, ui) {
            var ids = []
            var position_url = ['/api', pathname, 'position'].join('/');

            $('.sort:not(.child-list-record)').each(function(i) {
                ids.push($(this).data('id'));
            });

            $.post(position_url, {
                'ids': JSON.stringify(ids),
                'locale_id': $('#locale_id').data('locale-id'),
                'xsrf': $('#xsrf').data('token')
            });
        }
    }).disableSelection();

    $('.sortable-children').sortable({
        items: 'md-list-item.sort',
        handle: '.sortable-handle',
        forceHelperSize: true,
        forcePlaceholderSize: true,
        revert: true,
        opacity: .8,
        placeholder: 'sortable-placeholder',
        update: function(event, ui) {
            var ids = []
            var child_name = ui.item.data('childname')
            var parent_id = ui.item.closest('md-list-item.sort:not(.child-list-record)').data('id');
            var position_url = ['/api', pathname, parent_id, child_name, 'position'].join('/');

            ui.item.parent().children('.sort').each(function(i) {
                ids.push($(this).data('childid'));
            });

            $.post(position_url, {
                'ids': JSON.stringify(ids),
                'locale_id': $('#locale_id').data('locale-id'),
                'xsrf': $('#xsrf').data('token')
            });
        }
    }).disableSelection();

});
