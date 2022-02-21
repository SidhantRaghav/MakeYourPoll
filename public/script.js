// let socket=io();var row_no=2;let pollId,x=["a","b","c","d","e","f","g","h","i","j","k","l","m","n"],y=["1","2","3","4","5","6","7","8","9"],pg_arr=[];var q_opt;$.urlParam=function(t){var o=new RegExp("[?&]"+t+"=([^&#]*)").exec(window.location.href);if(o)return o[1]||0},$.urlParam("yourpoll")?jQuery(document).ready(function(t){t("#voteContainer").load("./comp/vote-container.html",()=>{t("#btn_copy").hide(),pollId=t.urlParam("yourpoll"),socket.emit("triger",{pollId:pollId}),socket.on("get_data",o=>{(q_opt=o.voting_data)||(alert("Poll has Ended!!"),t("#voteContainer").hide());let e=q_opt.s_ques;t("#question").text(e);for(let o=0;o<q_opt.s_opt.length;o++){let e=q_opt.s_opt[o];e&&t("#inside_options").append(`\n\t\t\t     <tr>\n               <th scope="row"><div class="input-group-text">\n\t\t\t      <input name="raw_checked"type="checkbox" aria-label="Checkbox for following text input">\n\t\t\t    </div></th>\n              <td>\n\t\t\t  <p name="raw_opts"><strong>${e}</strong></p>\n              </td>\n                </tr>\n\t\t\t`)}t("#placer").css("height","0px"),t("#h_adjust").css("height","0px"),t("#voteContainer").show()}),t("#btnUserVote").click(()=>{t("#voteContainer").hide();let o=pollId,e=t('input[name="raw_checked"]'),r=[];for(let t=0;t<e.length;t++)e[t].checked&&r.push(t.toString());socket.emit("vote",{pollId:o,opt_selected:r})})})}):jQuery(document).ready(t=>{t("#h_adjust").load("./comp/dashboard.html",()=>{function o(){for(var t="#",o=0;o<6;o++)t+="012456789ABCDEF"[Math.floor(15*Math.random())];return t}t("#resultContainer").load("./comp/result-container.html"),t("#resultContainer").hide(),t("#btnLivePoll").hide(),t("#btnPlus").click(function(){row_no++,t("#addOptions").append(`\n     <div class="input-group mb-3">\n     <div class="input-group-prepend">\n     <span class="input-group-text">Options</span>\n     </div>\n     <textarea class="form-control"id="inp-${row_no}" data-comp="${row_no}" placeholder="Type here..." name="inp${row_no}"></textarea>\n     </div>\n    `)}),t("#btnSubmit").click(()=>{t("#resultContainer").show(),q_opt=t(".form-control");let o=t("#"+q_opt[0].id).val(),e=[];q_opt=q_opt.slice(1);for(let o=0;o<q_opt.length;o++)pg_arr.push(0),e.push(t("#"+q_opt[o].id).val()),""!=t("#"+q_opt[o].id).val()&&t("#result_table").append(`\n        <tr>\n        <td scope="row"><strong>${t("#"+q_opt[o].id).val()}</strong></td>\n        </tr>\n        <tr>\n        <td>\n          <div class="progress">\n        <div id="${o}" class="progress-bar" role="progressbar"aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>\n        </div>\n          </td>\n        </tr>\n\t\t`);function r(t){var o=document.createElement("textarea");document.body.appendChild(o),o.value=t,o.select(),document.execCommand("copy"),document.body.removeChild(o)}pollId=x[Math.floor(14*Math.random())]+y[Math.floor(9*Math.random())]+x[Math.floor(14*Math.random())]+y[Math.floor(9*Math.random())]+x[Math.floor(14*Math.random())]+y[Math.floor(9*Math.random())]+x[Math.floor(14*Math.random())]+y[Math.floor(9*Math.random())],socket.emit("poll",{pollId:pollId,s_ques:o,s_opt:e}),socket.on("disconnect",t=>{alert("disconnected from server"),socket.emit("poll",{pollId:pollId,s_ques:o,s_opt:e})}),t("#btnLivePoll").show(),t("#btnLivePoll").css("title","http://poll-maker-2020.herokuapp.com/?yourpoll="+pollId),alert("Live Poling Link is copied to clipBoard or click Poll Link "),r("http://poll-maker-2020.herokuapp.com/?yourpoll="+pollId),t("#btnLivePoll").click(()=>{r("http://poll-maker-2020.herokuapp.com/?yourpoll="+pollId)}),t("#addOptions").hide(),t("#btns").hide(),t("#question1").text("Question:"+o),t("#resultContainer").show(),t("#btnEndPoll").show(),t("#placer").css("height","0px"),t("#btnEndPoll").click(()=>{confirm("Press Ok to Confirm End Poll!!")&&socket.emit("endPoll",{pollId:pollId})}),window.addEventListener("beforeunload",function(t){t.returnValue=confirm("Poll will end on Refresh!!"),t.returnValue&&socket.emit("endPoll",{pollId:pollId})})});let e=0;socket.on("vote_update",r=>{let n=[],l=r.opt_selected;e+=l.length;let a;for(let t=0;t<l.length;t++)a=parseInt(l[t]),pg_arr[a]++;for(let o=0;o<pg_arr.length;o++){let r=pg_arr[o]/e*100;n.push({percent_progress:r,i:o}),t("#"+o.toString()).css("width",r.toString()+"%")}n.sort(function(t,o){var e=t.percent_progress,r=o.percent_progress;return e<r?-1:e>r?1:0});let p=n[0].percent_progress,s=o();for(let e=0;e<n.length;e++)p==n[e].percent_progress?t("#"+n[e].i.toString()).css("background-color",s):(p=n[e].percent_progress,s=o(),t("#"+n[e].i.toString()).css("background-color",s));let i=n[n.length-1].percent_progress;for(let o=n.length-1;o>=0&&i==n[o].percent_progress;o--)t("#"+n[o].i.toString()).css("background-color","#39FF14")})})});

let socket = io();
var row_no = 2;
let x = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'];
let y = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
let pg_arr = [];
let pollId;
var q_opt;
$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results)
        return results[1] || 0;
}
if ($.urlParam('yourpoll')) {
    jQuery(document).ready(function($) {
        $('#voteContainer').load('./comp/vote-container.html', () => {
            $('#btn_copy').hide();
            pollId = $.urlParam('yourpoll')
            socket.emit('triger', {
                pollId: pollId
            });
            socket.on('get_data', (data) => {
                q_opt = data.voting_data;
                if (!q_opt) {
                    alert("Poll has Ended!!")
                    $('#voteContainer').hide();
                }
                let question = q_opt.s_ques;

                $('#question').text(question);

                for (let i = 0; i < q_opt.s_opt.length; i++) {
                    let input_question = q_opt.s_opt[i];
                    if (input_question) {
                        $('#inside_options').append(`
           <tr class="clickable-row">
               <th scope="row"><div class="input-group-text">
            <input name="raw_checked"type="checkbox" aria-label="Checkbox for following text input">
          </div></th>
              <td>
        <p name="raw_opts"><strong>${input_question}</strong></p>
              </td>
                </tr>
      `)
                    }
                }
                $('#placer').css('height', '0px');
                $('#h_adjust').css('height', '0px');
                $('#voteContainer').show();
            })
            $('#btnUserVote').click(() => {
                $('#voteContainer').hide()

                let to = pollId;
                let opt_array = $('input[name="raw_checked"]');
                let opt_actual = [];
                for (let i = 0; i < opt_array.length; i++) {
                    if (opt_array[i].checked) {
                        opt_actual.push(i.toString());
                    }
                }
                socket.emit('vote', {
                    pollId: to,
                    opt_selected: opt_actual
                })
            })
        });
    });

} else {
    jQuery(document).ready(($) => {
            $('#h_adjust').load('./comp/dashboard.html', () => {
                // $('#resultContainer').load('./comp/result-container.html');
                // $('#resultContainer').hide();
                function getRandomColor() {
                    var letters = '012456789ABCDEF';
                    var color = '#';
                    for (var i = 0; i < 6; i++) {
                        color += letters[Math.floor(Math.random() * 15)];
                    }
                    return color;
                }

                function pollCreate() {
                    pollId = x[Math.floor(Math.random() * 14)] + y[Math.floor(Math.random() * 9)] + x[Math.floor(Math.random() * 14)] + y[Math.floor(Math.random() * 9)] + x[Math.floor(Math.random() * 14)] + y[Math.floor(Math.random() * 9)] + x[Math.floor(Math.random() * 14)] + y[Math.floor(Math.random() * 9)];
                }
                $('#btnLivePoll').hide();

                $('#btnPlus').click(function() {
                    row_no++;
                    $('#addOptions').append(`
     <div class="input-group mb-3">
     <div class="input-group-prepend">
     <span class="input-group-text">Options</span>
     </div>
     <textarea class="form-control"id="inp-${row_no}" data-comp="${row_no}" placeholder="Type here..." name="inp${row_no}"></textarea>
     </div>
    `)
                })

                $('#btnSubmit').click(() => {
                    $('#resultContainer').show();
                    // $('#h_adjust').remove();
                    q_opt = $('.form-control');
                    let s_ques = $('#' + q_opt[0].id).val();
                    let s_opt = [];
                    q_opt = q_opt.slice(1);
                    $('#resultContainer').append(`
        <div class="card shadow p-3 mb-2 bg-white rounded">
  <div class="card-header">
    Question
  </div>
  <div class="card-body">
    <blockquote class="blockquote mb-0">
      <p>${s_ques}.</p>
    </blockquote>
  </div>
</div>
    	`)
                    for (let i = 0; i < q_opt.length; i++) {
                        pg_arr.push(0);
                        s_opt.push($('#' + q_opt[i].id).val());
                        if ($('#' + q_opt[i].id).val() != "") {
                            $('#resultContainer').append(`
       <div class="card shadow p-3 mb-3 bg-white rounded">
  <div class="card-header">
    <strong>${$('#'+q_opt[i].id).val()}</strong>
  </div>
  <div class="card-body">
<div class="progress">
        <div id="${i}" class="progress-bar" role="progressbar"aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
  </div>
</div> 
    `)
                        }
                    }
                    pollCreate();
                    socket.emit('poll', {
                            pollId: pollId,
                            s_ques: s_ques,
                            s_opt: s_opt
                        })
                        //changes
                    socket.on('disconnect', (data) => {
                            alert('disconnected from server')
                            socket.emit('poll', {
                                pollId: pollId,
                                s_ques: s_ques,
                                s_opt: s_opt
                            })
                        })
                        //
                    $('#btnLivePoll').show();
                    $('#btnLivePoll').css('title', "http://poll-maker-2020.herokuapp.com/?yourpoll=" + pollId);
                    alert("Live Poling Link is copied to clipBoard or click Poll Link ")

                    function copyToClipboard(text) {
                        var dummy = document.createElement("textarea");
                        document.body.appendChild(dummy);
                        dummy.value = text;
                        dummy.select();
                        document.execCommand("copy");
                        document.body.removeChild(dummy);
                    }
                    copyToClipboard("http://poll-maker-2020.herokuapp.com/?yourpoll=" + pollId);
                    $('#btnLivePoll').click(() => {
                        $.get('/data', {}, (data_poll) => {
                                console.log(data_poll);
                            })
                            // copyToClipboard("http://poll-maker-2020.herokuapp.com/?yourpoll="+pollId);
                    })
                    $("#addOptions").hide();
                    $("#btns").hide();
                    $('#question1').text('Question:' + s_ques);
                    $('#resultContainer').show();
                    $('#btnEndPoll').show();
                    $('#placer').css('height', '0px');
                    $('#btnEndPoll').click(() => {
                        let confermation = confirm("Press Ok to Confirm End Poll!!")
                        if (confermation) {
                            socket.emit('endPoll', {
                                pollId: pollId
                            });
                        }
                    });
                    window.addEventListener("beforeunload", function(event) {
                        event.returnValue = confirm("Poll will end on Refresh!!")
                        if (event.returnValue) {
                            socket.emit('endPoll', {
                                pollId: pollId
                            });
                        }
                    })
                })
                let tot = 0;
                socket.on('vote_update', (data) => {
                    let percent_arr = [];
                    let voted_options = data.opt_selected;
                    tot += voted_options.length;
                    let temp = 0;
                    let int_inp;
                    for (let i = 0; i < voted_options.length; i++) {
                        int_inp = parseInt(voted_options[i]);
                        pg_arr[int_inp]++;
                    }
                    for (let i = 0; i < pg_arr.length; i++) {
                        let percent_progress = ((pg_arr[i]) / tot) * 100;
                        percent_arr.push({
                            percent_progress,
                            i
                        });
                        $('#' + i.toString()).css('width', percent_progress.toString() + '%');
                    }
                    percent_arr.sort(function(a, b) {
                        var keyA = a.percent_progress,
                            keyB = b.percent_progress;
                        if (keyA < keyB) return -1;
                        if (keyA > keyB) return 1;
                        return 0;
                    });
                    let check = percent_arr[0].percent_progress;
                    let color_default = getRandomColor();
                    for (let i = 0; i < percent_arr.length; i++) {
                        if (check == percent_arr[i].percent_progress) {
                            $('#' + percent_arr[i].i.toString()).css('background-color', color_default);
                        } else {
                            check = percent_arr[i].percent_progress;
                            color_default = getRandomColor();
                            $('#' + percent_arr[i].i.toString()).css('background-color', color_default);
                        }
                    }
                    let winner = percent_arr[percent_arr.length - 1].percent_progress;
                    for (let i = percent_arr.length - 1; i >= 0; i--) {
                        if (winner == percent_arr[i].percent_progress) {
                            $('#' + percent_arr[i].i.toString()).css('background-color', '#39FF14');
                        } else {
                            break;
                        }
                    }
                })

            })

        }) //main  
}