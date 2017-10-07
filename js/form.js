$(document).ready(function () {

    $('.modal').modal('open');

    var $buptid = $('#buptid');
    $buptid.change(function () {//注册
        $.ajax({
            type: "POST",
            url: "API/signIn.php",
            dataType: "json",
            data: {
                "studentID": $('#buptid').val(),
                "pwd": ""
            },
            success: function (data) {
                if (data.result === "NewUser") {
                    //Materialize.toast("注册成功！", 6000);
                }
                else {
                    $("#you-are-in").openModal({
                        complete: function () {
                            window.location.href = 'modify.html';
                        }
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    });


    $("#submit_btn").click(function (e) {//除文件外的其他信息

        $.ajax({
            type: "POST",
            url: "API/signIn.php",
            dataType: "json",
            data: {
                "studentID": $buptid.val(),
                "pwd": ""
            },
            success: function (data) {
                if (data.result === "NewUser") {
                    //Materialize.toast("注册成功！", 6000);
                }
                else {
                    $("#you-are-in").openModal({
                        complete: function () {
                            window.location.href = 'modify.html';
                        }
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });

        var url = "API/info.php"; // the script where you handle the form input.

        var sub = {};
        sub.studentID = $buptid.val();
        var pwval = $("#password").val();
        if (pwval !== "") {
            sub.pwd = hex_md5(b64_md5(hex_md5(pwval)));
        } else {
            Materialize.toast("请填写密码", 6000);
            e.preventDefault(); // avoid to execute the actual submit of the form.
            return;
        }
        sub.campus = $("#campus").val();
        sub.school = $("#school").val();
        sub.name = $("#name").val();
        sub.gender = $("#gender").val();
        sub.contact = $("#contact").val();
        sub.college_class = $("#class").val();
        sub.title = $("#song").val();
        sub.noMusic = $("#way").val();
        sub.type = $("input[name='single_or_group']:checked").val();
        sub.teamName = $("#team_name").val();
        sub.teamPeople = parseInt($("#number").val());
        if (isNaN(sub.teamPeople)) {
            sub.teamPeople = 1;
        }
        if (sub.teamPeople !== 1) {
            sub.teamInfo = "";
            sub.teamInfo += "{\"队员1\":\"" + $('#com1_name').val() + "\", \"队员1学号\":\"" + $('#com1_id').val() + "\","
            +"\"队员2\":\"" + $('#com2_name').val() + "\", \"队员2学号\":\"" + $('#com2_id').val() + "\","
            +"\"队员3\":\"" + $('#com3_name').val() + "\", \"队员3学号\":\""  + $('#com3_id').val() + "\","
            +"\"队员4\":\"" + $('#com4_name').val() + "\", \"队员4学号\":\"" + $('#com4_id').val() + "\","
            +"\"队员5\":\"" + $('#com5_name').val() + "\", \"队员5学号\":\"" + $('#com5_id').val() + "\"}";

        } else sub.teamInfo = null;

        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: sub,
            success: function (data) {
                if (data.result === "Succeeded") {
                    Materialize.toast("提交成功！", 6000);
                }
                else if (data.result === "Forbidden") {
                    Materialize.toast("未注册，提交失败！请检查学号！", 6000);
                }
                else Materialize.toast("提交失败！请把信息填写完整", 6000);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
        e.preventDefault(); // avoid to execute the actual submit of the form.
    });


});


