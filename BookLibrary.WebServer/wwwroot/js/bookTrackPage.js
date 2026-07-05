$(function () {
    if (document.getElementById("track-table") == null || document.getElementById("track-table").rows.length <= 10) {
        document.getElementById("SelectedMode").style.display = "none";
    }

    $("#SelectedMode").on("change", function () {
        const url = new URL(window.location.href);
        const currentTracksCount = url.searchParams.get("tracksCount") || "10";
        url.searchParams.set("tracksCount", $("#SelectedMode").val());
        window.location.href = url.toString();
    });
});

