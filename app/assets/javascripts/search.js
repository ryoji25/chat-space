$(function() {

  var search_list = $("#user-search-result");
  var search_user = $("#chat-group-users");

  function appendList(user){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
              </div>`
    search_list.append(html);
  }

  function appendUser(user_id, user_name){
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    search_user.append(html);
  }


  
  
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0 && input.length !== 0) {
        users.forEach(function(user){
          appendList(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail (function() {
        alert("ユーザー検索に失敗しました");
      })
  });
  $(document).on('click', '.user-search-add', function(){
    $('chat-group-users').val();
    var user_id = $(this).data('user-id');
    var user_name = $(this).data('user-name');
    appendUser(user_id, user_name);
    $(this).parent().remove();
  });
  $(document).on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  });
});

                // <div class="chat-group-user clearfix js-chat-member" id="chat-group-user-${user_id}>
                //   <input name="group[user_ids][]" type="hidden" value=${user_id}>
                //   <p class="chat-group-user__name">${user_name}</p>
                //   <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                // </div>