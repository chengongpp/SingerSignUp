$(document).ready(function () {
    $('#confirm_pwd').click(function (e) {

        var subinfo = {};
        subinfo.studentID = $('#buptid').val();
        subinfo.pwd = hex_md5(b64_md5(hex_md5($("#password").val())));

        $.ajax({
            type: "POST",
            url: "API/signIn.php",
            dataType: "json",
            data: subinfo,
            success: function (data) {
                if (data.result === "NewUser") {
                    Materialize.toast("您还没有注册过！", 6000);
                }
                else if (data.result === "Succeeded") {
                    Materialize.toast("验证通过！请稍候……", 6000);
                    $("#warning_card").slideUp();
                    $("#modify").slideDown();

                    $.ajax({
                        type: "GET",
                        url: "API/info.php",
                        dataType: "json",
                        success: function (data) {
                            $("#buptid2").val(data.studentID);
                            $("#campus").val(data.campus)
                                .material_select();
                            $("#school").val(data.school)
                                .material_select();
                            $("#name").val(data.name);
                            $("#gender").val(data.gender)
                                .material_select();
                            $("#contact").val(data.contact);
                            $("#class").val(data.college_class);
                            $("#song").val(data.title);
                            $("#way").val(data.noMusic)
                                .material_select();
                            $("#team_name").val(data.teamName);
                            $("#number").val(data.teamPeople);
                            $("#others").val(data.teamInfo);
                            $("#userfile_name").val(data.file);
                            if (data.type === "single") {
                                $("input#app_for_single").attr("checked", 'checked');
                            } else {
                                $("input#app_for_group").attr("checked", 'checked');
                                $("#group_pos").slideDown();
                            }
                            Materialize.updateTextFields();
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                        }
                    });
                }
                else if (data.result === "Failed") {
                    Materialize.toast("口令错误请重试！", 6000);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alert("XMLHttpRequest " + XMLHttpRequest[0]);
            }
        });
        e.preventDefault(); // avoid to execute the actual submit of the form.
    });


    $.ajaxSetup({
        type: "POST",
        url: "API/Info.php",
        dataType: "json",
        success: function (data) {
            if (data.result === "Succeeded") {
                Materialize.toast("修改成功！", 6000);
            } else {
                Materialize.toast("修改失败 请重试", 6000);
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });


    $('#class').change(function () {
        var sub = {};
        sub.college_class = $("#class").val();
        $.ajax({
            data: sub
        });
    });
    $('#campus').change(function () {
        var sub = {};
        sub.campus = $("#campus").val();
        $.ajax({
            data: sub
        });
    });
    $('#school').change(function () {
        var sub = {};
        sub.school = $("#school").val();
        $.ajax({
            data: sub
        });
    });
    $('#name').change(function () {
        var sub = {};
        sub.name = $("#name").val();
        $.ajax({
            data: sub
        });
    });
    $('#gender').change(function () {
        var sub = {};
        sub.gender = $("#gender").val();
        $.ajax({
            data: sub
        });
    });
    $('#contact').change(function () {
        var sub = {};
        sub.contact = $("#contact").val();
        $.ajax({
            data: sub
        });
    });
    $('#song').change(function () {
        var sub = {};
        sub.title = $("#song").val();
        $.ajax({
            data: sub
        });
    });
    $('#way').change(function () {
        var sub = {};
        sub.noMusic = $("#way").val();
        $.ajax({
            data: sub
        });
    });
    $("input[name='single_or_group']").change(function () {
        var sub = {};
        sub.type = $("input[name='single_or_group']:checked").val();
        $.ajax({
            data: sub
        });
    });
    $('#team_name').change(function () {
        var sub = {};
        sub.teamName = $("#team_name").val();
        $.ajax({
            data: sub
        });
    });
    $('#number').change(function () {
        var sub = {};
        sub.teamPeople = $("#number").val();
        $.ajax({
            data: sub
        });
    });
    $('#others').change(function () {
        var sub = {};
        sub.teamInfo = $('#others').val();
        $.ajax({
            data: sub
        });
    });


});