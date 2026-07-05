
$(function () {
    // $("#SelectedMode").val("all");
    LoadIndexBookTable();
});

function LoadIndexBookTable() {
    
    $('#library-table').DataTable({
        serverSide: true,
        ajax: {
            url: 'api/books',
            type: 'GET',
            data: function (d) { d.tableSelectedMode = $('#SelectedMode').val(); }
        },
        processing: true,
        columns: [
            {
                name: "Name",
                sortable: true,
                render: function (data, type, row) {
                    return '<a href=\"Books/BookTrack?bookId=' + row[4] + '&tracksCount=10' + '\" title="' + data + '">' + data + '</a>';
                }
            },
            {
                name: "Authors",
                render: function (data, type, row) {
                    return data.join(", ");
                },
                sortable: false
            },
            {
                name: "Year",
                sortable: true,
                render: function (data, type, row) {
                    return new Date(data).getFullYear();
                },
                width: "10%"
            },
            {
                name: "IsAvailable",
                sortable: true,
                render: readonlyCheckbox,
                className: 'text-center',
                width: "15%"
            },
            {
                name: "Id",
                searchable: false,
                sortable: false,
                render: function (data, type, row) {
                    return '<a href=\"Books/EditBook?bookId=' +
                        data + '\">Edit</a> | ' +
                        '<a href=\"Books/DeleteBook?bookId=' +
                        data +
                        '\" onClick=\"return confirm(\'Are you sure you want to delete this book?\');\">Delete</a>';
                },
                width: "15%"
            }
        ],
        order: []
    });

}

function readonlyCheckbox (data, type, full, meta) {
    var is_checked = data == true ? "checked" : "";
    return '<input type="checkbox" class="checkbox" onclick="return false;"' +
        is_checked + ' />';
}