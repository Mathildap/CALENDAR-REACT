(this.webpackJsonpcalendar=this.webpackJsonpcalendar||[]).push([[0],{15:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),o=n(8),i=n.n(o),r=n(2),s=n(3),d=n.n(s),u=(n(15),n(4)),l=n(0);var j=function(e){var t=e.todo,n=e.onDelete,a=e.onToggle,c=e.editTodo;return Object(l.jsx)("div",{className:"todo",children:Object(l.jsxs)("div",{className:"".concat(!0===t.done?"reminder":""),children:[Object(l.jsxs)("div",{className:"todo-click-box",onClick:function(){c(t)},children:[Object(l.jsx)("span",{className:"todo-text",children:t.text}),Object(l.jsx)("span",{className:"todo-time_date",children:t.time}),Object(l.jsx)("span",{className:"todo-time_date",children:t.date})]}),Object(l.jsxs)("div",{children:[Object(l.jsx)(u.a,{style:{color:"#777777",cursor:"pointer",fontSize:"1.1rem"},onClick:function(){return a({id:t._id,done:t.done})}}),Object(l.jsx)(u.d,{style:{color:"#777777",cursor:"pointer",marginLeft:"1px",marginRight:"-5px"},onClick:function(){return n(t._id)}})]})]})})};var h=function(e){var t=e.todos,n=e.onDelete,a=e.onToggle,c=e.editTodo;return void 0===t?Object(l.jsx)("div",{className:"aside-container alltodos-container loading",children:"Loading..."}):Object(l.jsxs)("div",{className:"aside-container alltodos-container",children:[Object(l.jsx)("h1",{children:"All Todos"}),t.sort((function(e,t){return d()(t.date,"DD-MM-YYYY")<d()(e.date,"DD-MM-YYYY")?1:-1})).filter((function(e){return!1===e.done})).map((function(e){return Object(l.jsx)(j,{todo:e,onDelete:n,onToggle:a,editTodo:c},e._id)}))]})};var b=function(e){var t,n=e.day,a=e.api,c=e.month,o=e.clickedDay,i=e.colorDayHandler,r=e.todos,s=d()().format("DD-MM-YYYY");if(t="31"===n?31:d()(n,"DD-MM-YYYY").format("D"),void 0===r)return Object(l.jsx)("div",{});var u=n+"-"+c,j=0,h=d()(u,"DD-MM-YYYY").format("YYYY-MM-DD");return Object(l.jsxs)("div",{onMouseDown:function(e){document.querySelectorAll("*").forEach((function(e){e.classList.remove("clickedday")}))},onClick:function(e){if(10===e.target.id.length){var t=e.target.id,n={date:t.slice(-2),year:t.slice(-7,-2),mon:t.replace(/ .*/,""),id:e.target.id};o(n),i(t)}else{var a=e.target.parentNode.id,c={date:a.slice(-2),year:a.slice(-7,-2),mon:a.replace(/ .*/,""),id:e.target.parentNode.id};o(c),i(a)}},id:u,className:"".concat(u===s?"days-day_cont currentday":"days-day_cont"),children:[Object(l.jsxs)("h3",{children:[t,a.filter((function(e){return e.datum===h})).map((function(e){return Object(l.jsx)("span",{className:"days-api",children:e.helgdag},e.datum)}))]}),r.sort((function(e,t){return t.time<e.time?1:-1})).filter((function(e){return e.date===u})).map((function(e){return j++,Object(l.jsxs)("div",{className:"inline day-todo",children:[Object(l.jsx)("span",{className:"dot",children:"\u30fb"}),e.text]},e._id)})),Object(l.jsx)("div",{className:"days-todo_count",children:0===j?"":j+" Todo:"})]})},p=n(9),m=n.n(p);var f=function(){return Object(l.jsx)(m.a,{type:"spin",color:"rgb(241, 136, 139)",height:"15%",width:"15%",className:"loading"})};d.a.updateLocale("sv",{week:{dow:1}});var O=function(e){for(var t=e.days,n=e.firstDayOfMonth,c=parseInt(n,10),o=[],i=0;i<c;i++)o.push(i);var s=d.a.weekdaysShort(!0).map((function(e){return Object(l.jsx)("div",{className:"weekdays-day_cont",children:e},e)})),u=function(t){e.clickedDay(t)},j=Object(a.useState)(""),h=Object(r.a)(j,2),p=h[0],m=h[1],O=function(e){m(e)};return Object(a.useEffect)((function(){""!==p&&document.getElementById(p).classList.add("clickedday")}),[p]),Object(l.jsxs)("section",{className:"calendar-container",children:[Object(l.jsx)("div",{className:"weekdays-container",children:s}),Object(l.jsxs)("div",{className:"days-container",children:[o.map((function(e,t){return Object(l.jsx)("div",{className:"days-day_cont empty"},t)})),void 0!==t?t.map((function(t){return Object(l.jsx)(b,{month:e.monthInNr,day:t,api:e.api,clickedDay:u,colorDayHandler:O,todos:e.todos},e.monthInNr+t)})):Object(l.jsx)(f,{})]})]})};var x=function(e){var t=d()(e.month,"MM-YYYY").format("MMMM YYYY"),n=e.user.split(" ")[0];return Object(l.jsxs)("header",{children:[Object(l.jsxs)("div",{className:"header-name_btn",children:[Object(l.jsx)("div",{className:"header-username",children:n}),Object(l.jsx)("button",{onClick:e.logOutHandler,className:"logOutBtn",children:"Sign out"})]}),Object(l.jsxs)("div",{className:"header",children:[Object(l.jsx)(u.b,{type:"submit",onClick:function(){e.changeMonth("back")},className:"header-arrow"}),Object(l.jsx)("h1",{children:t}),Object(l.jsx)(u.c,{type:"submit",onClick:function(){e.changeMonth("forward")},className:"header-arrow"})]})]})};var v=function(e){var t=Object(a.useState)(""),n=Object(r.a)(t,2),c=n[0],o=n[1],i=Object(a.useState)(""),s=Object(r.a)(i,2),d=s[0],u=s[1];return Object(l.jsx)("div",{children:Object(l.jsxs)("form",{onSubmit:function(t){var n={text:c,time:d};t.preventDefault(),e.inputToDo(n),o(""),u(),document.getElementById("appt").value=""},children:[Object(l.jsx)("input",{onChange:function(e){o(e.target.value)},type:"text",value:c,placeholder:"New Todo",id:"newTodoInput",maxLength:"20",required:!0}),Object(l.jsx)("input",{type:"time",id:"appt",name:"appt",onChange:function(e){u(e.target.value)}}),Object(l.jsx)("button",{type:"submit",id:"newTodoBtn",children:"+"})]})})};var g=function(e){var t=e.clickedDay,n=e.todos,a=e.onDelete,c=e.onToggle,o=e.editTodo,i=d()(t,"DD-MM-YYYY").format("D MMMM YY");return void 0===n?Object(l.jsx)("div",{className:"aside-container loading",children:"Loading..."}):Object(l.jsxs)("article",{className:"today-todo_container",children:[Object(l.jsx)("h1",{children:i}),n.sort((function(e,t){return t.time<e.time?1:-1})).filter((function(e){return e.date===t})).map((function(e){return Object(l.jsx)("div",{className:"todo",children:Object(l.jsxs)("div",{className:"".concat(!0===e.done?"reminder":""),children:[Object(l.jsxs)("div",{className:"todo-click-box",onClick:function(){o(e)},children:[e.text,"  ",Object(l.jsx)("span",{className:"todo-time_date",children:e.time}),Object(l.jsx)("span",{className:"todo-time_date",children:e.date})]}),Object(l.jsxs)("div",{children:[Object(l.jsx)(u.a,{style:{color:"#777777",cursor:"pointer",fontSize:"1.1rem"},onClick:function(){return c({id:e._id,done:e.done})}}),Object(l.jsx)(u.d,{style:{color:"#777777",cursor:"pointer",marginLeft:"1px",marginRight:"-5px"},onClick:function(){return a(e._id)}})]})]})},e._id)}))]})};var y=function(e){var t=e.userInfo,n=e.newUserInfo,c=e.errorMsg,o=e.emailExist,i=Object(a.useState)(""),s=Object(r.a)(i,2),d=s[0],u=s[1],j=Object(a.useState)(""),h=Object(r.a)(j,2),b=h[0],p=h[1],m=Object(a.useState)(!0),f=Object(r.a)(m,2),O=f[0],x=f[1],v=Object(a.useState)(""),g=Object(r.a)(v,2),y=g[0],Y=g[1],N=Object(a.useState)(""),M=Object(r.a)(N,2),S=M[0],k=M[1],D=Object(a.useState)(""),w=Object(r.a)(D,2),C=w[0],I=w[1];return Object(l.jsx)(l.Fragment,{children:O?Object(l.jsx)("div",{className:"login-page",children:Object(l.jsx)("div",{id:"logInContainer",children:Object(l.jsx)("div",{id:"logInInputs",children:Object(l.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t({email:d,password:b})},children:[Object(l.jsx)("input",{type:"email",placeholder:"EMAIL",id:"userName",className:"logInField",onChange:function(e){u(e.target.value.toLowerCase())},value:d,required:!0}),Object(l.jsx)("input",{type:"password",placeholder:"PASSWORD",id:"passWord",className:"logInField",onChange:function(e){p(e.target.value)},value:b,required:!0}),Object(l.jsx)("div",{className:"eye-icon",onClick:function(){var e=document.getElementById("passWord");"password"===e.type?e.type="text":e.type="password"},children:"Show password"}),c?Object(l.jsx)("p",{id:"errorMsg",children:"Sorry, invalid login!"}):"",Object(l.jsx)("button",{id:"logInBtn",children:"Sign in"}),Object(l.jsx)("p",{onClick:function(){return x(!O)},id:"signUp",children:"Create account"})]})})})}):Object(l.jsx)("div",{className:"login-page",children:Object(l.jsx)("div",{id:"newLogInContainer",children:Object(l.jsx)("div",{id:"logInInputs",children:Object(l.jsxs)("form",{onSubmit:function(e){e.preventDefault(),n({userName:y,email:S,passWord:C})},children:[Object(l.jsx)("input",{type:"text",placeholder:"CHOOSE NAME",id:"newUserName",className:"logInField",required:"required",onChange:function(e){return Y(e.target.value)},value:y}),Object(l.jsx)("input",{type:"email",placeholder:"CHOOSE EMAIL",id:"newEmail",className:"logInField",required:"required",onChange:function(e){return k(e.target.value.toLowerCase())},value:S}),Object(l.jsx)("input",{type:"password",placeholder:"CHOOSE PASSWORD",id:"newPassWord",className:"logInField",required:"required",onChange:function(e){return I(e.target.value)},value:C}),Object(l.jsx)("div",{className:"eye-icon new-icon",onClick:function(){var e=document.getElementById("newPassWord");"password"===e.type?e.type="text":e.type="password"},children:"Show password"}),o?Object(l.jsx)("p",{id:"errorMsg",children:"Email already exist!"}):"",Object(l.jsx)("button",{id:"createAccount",children:"Create account"}),Object(l.jsx)("p",{onClick:function(){return x(!O)},id:"signUp",children:"Have an account? Sign in"})]})})})})})};var Y=function(e){var t=e.notes,n=e.onDelete;return void 0===t?Object(l.jsx)("div",{className:"aside-container loading",children:"Loading..."}):Object(l.jsxs)("article",{className:"today-todo_container",children:[Object(l.jsx)("h1",{children:"Notes"}),t.map((function(e){return Object(l.jsx)("div",{className:"todo",children:Object(l.jsxs)("div",{children:[e.note,"  ",Object(l.jsx)("div",{children:Object(l.jsx)(u.d,{style:{color:"#777777",cursor:"pointer",marginLeft:"1px",marginRight:"-5px"},onClick:function(){return n(e._id)}})})]})},e._id)}))]})};var N=function(e){var t=e.newNote,n=Object(a.useState)(""),c=Object(r.a)(n,2),o=c[0],i=c[1];return Object(l.jsx)("div",{children:Object(l.jsxs)("form",{onSubmit:function(e){var n=o;e.preventDefault(),t(n),i("")},children:[Object(l.jsx)("input",{onChange:function(e){i(e.target.value)},type:"text",value:o,placeholder:"New Note",id:"newNoteInput",required:!0}),Object(l.jsx)("button",{type:"submit",id:"newTodoBtn",children:"+"})]})})},M=n(5),S=n(7);var k=function(e){var t=e.todo,n=e.updatedTodo,c=e.closeEdit,o=Object(a.useState)(t),i=Object(r.a)(o,2),s=i[0],d=i[1],u=Object(a.useRef)();Object(a.useEffect)((function(){var e=function(e){u.current.contains(e.target)||c("")};return document.addEventListener("mousedown",e),function(){document.removeEventListener("mousedown",e)}}));var j=function(e){d((function(t){return Object(S.a)(Object(S.a)({},t),{},Object(M.a)({},e.target.id,e.target.value))}))};return Object(l.jsx)("div",{className:"edit-container",ref:u,children:Object(l.jsxs)("form",{onSubmit:function(e){e.preventDefault(),n(s)},children:[Object(l.jsx)("input",{type:"text",value:s.text,onChange:j,id:"text"}),Object(l.jsx)("br",{}),Object(l.jsx)("input",{type:"time",value:s.time,onChange:j,id:"time"}),Object(l.jsx)("br",{}),Object(l.jsx)("input",{type:"text",value:s.date,onChange:j,id:"date"}),Object(l.jsx)("br",{}),Object(l.jsx)("button",{type:"submit",children:"Save"})]})})};d.a.updateLocale("sv",{week:{dow:1}});var D=function(){var e,t=Object(a.useState)(""),n=Object(r.a)(t,2),c=n[0],o=n[1],i=Object(a.useState)(),s=Object(r.a)(i,2),u=s[0],j=s[1],b=Object(a.useState)(),p=Object(r.a)(b,2),m=p[0],f=p[1],M=Object(a.useState)(d()().format("MM-YYYY")),S=Object(r.a)(M,2),D=S[0],w=S[1],C=function(e){var t=d()(e,"MM-YYYY").add(-1,"month").format("MM-YYYY"),n=d()(D,"MM-YYYY").add(-1,"month").format("MM-YYYY");return w(n),t},I=function(e){var t=d()(e,"MM-YYYY").add(1,"month").format("MM-YYYY"),n=d()(D,"MM-YYYY").add(1,"month").format("MM-YYYY");return w(n),t},E=Object(a.useState)(D.slice(-4)),T=Object(r.a)(E,2),_=T[0],L=T[1],J=Object(a.useState)([]),q=Object(r.a)(J,2),A=q[0],B=q[1],H="";Object(a.useEffect)((function(){e=D.slice(0,2),L(D.slice(-4)),fetch(H+="https://sholiday.faboul.se/dagar/v2.1/"+_+"/"+e).then((function(e){return e.json()})).then((function(e){B(e.dagar)}))}),[D]);var F=Object(a.useState)([]),W=Object(r.a)(F,2),R=W[0],U=W[1],P=Object(a.useState)(d()()),z=Object(r.a)(P,2),G=z[0],K=z[1];Object(a.useEffect)((function(){!function(){var e=Array.from({length:d()(D,"MM").daysInMonth()},(function(e,t){return d()(D,"MM").startOf("month").add(t,"days").format("DD")}));U(e)}(),function(){var e=d()(D,"MM").startOf("month").add(-1,"days").format("d");K(e)}()}),[D]);var Q=Object(a.useState)(d()().format("DD-MM-YYYY")),V=Object(r.a)(Q,2),X=V[0],Z=V[1],$=Object(a.useState)(d()().format("DD-MM-YYYY")),ee=Object(r.a)($,2),te=ee[0],ne=ee[1],ae=Object(a.useState)(),ce=Object(r.a)(ae,2),oe=ce[0],ie=ce[1];Object(a.useEffect)((function(){var e=c.id;fetch("https://calendar-backend-mathildap.herokuapp.com/get",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify({userId:e})}).then((function(e){return e.json()})).then((function(e){return ie(e)}))}),[c]);var re=function(e){var t={id:e,userId:c.id};fetch("https://calendar-backend-mathildap.herokuapp.com/delete",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){ie(e)}))},se=function(e){var t;t=!0!==e.done;var n={id:e.id,done:t,userId:c.id};fetch("https://calendar-backend-mathildap.herokuapp.com/update",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify(n)}).then((function(e){return e.json()})).then((function(e){ie(e)}))},de=Object(a.useState)(""),ue=Object(r.a)(de,2),le=ue[0],je=ue[1],he=function(e){je(e)},be=Object(a.useState)(),pe=Object(r.a)(be,2),me=pe[0],fe=pe[1];return Object(a.useEffect)((function(){var e=c.id;fetch("https://calendar-backend-mathildap.herokuapp.com/notes/get",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify({userId:e})}).then((function(e){return e.json()})).then((function(e){return fe(e)}))}),[c]),Object(l.jsx)("main",{children:""===c?Object(l.jsx)(y,{userInfo:function(e){fetch("https://calendar-backend-mathildap.herokuapp.com/users",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify({info:e})}).then((function(e){return e.json()})).then((function(e){"error"!==e?(o({userName:e.username,id:e.id}),j()):j("error")}))},newUserInfo:function(e){fetch("https://calendar-backend-mathildap.herokuapp.com/users/new",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify({newUser:e})}).then((function(e){return e.json()})).then((function(e){"email exist"!==e?(o({userName:e.username,id:e.id}),f()):f("email exist")}))},errorMsg:u,emailExist:m}):Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(x,{month:D,changeMonth:function(e){if("back"===e){var t=C(D);w(t)}else if("forward"===e){var n=I(D);w(n)}},user:c.userName,logOutHandler:function(){o("")}}),Object(l.jsxs)("section",{className:"main-container",children:[Object(l.jsx)(O,{monthInNr:D,days:R,api:A,firstDayOfMonth:G,clickedDay:function(e){ne(e.id),Z(e.id)},todos:oe,onDelete:re,onToggle:se}),Object(l.jsxs)("aside",{children:[Object(l.jsxs)("div",{className:"aside-container",children:[Object(l.jsx)(g,{clickedDay:X,todos:oe,onDelete:re,onToggle:se,editTodo:he}),Object(l.jsx)(v,{clickedDay:X,inputToDo:function(e){var t={userId:c.id,text:e.text,time:e.time,date:te,done:!1};fetch("https://calendar-backend-mathildap.herokuapp.com/new",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){return ie(e)}))}})]}),Object(l.jsxs)("div",{className:"aside-container",children:[Object(l.jsx)(Y,{notes:me,onDelete:function(e){var t={id:e,userId:c.id};fetch("https://calendar-backend-mathildap.herokuapp.com/notes/delete",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){fe(e)}))}}),Object(l.jsx)(N,{newNote:function(e){var t={userId:c.id,note:e,done:!1};fetch("https://calendar-backend-mathildap.herokuapp.com/notes/newNote",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){fe(e)}))}})]}),Object(l.jsx)(h,{todos:oe,onDelete:re,onToggle:se,editTodo:he})]})]}),""===le?"":Object(l.jsx)(k,{todo:le,updatedTodo:function(e){console.log(e),fetch("https://calendar-backend-mathildap.herokuapp.com/edit",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()})).then((function(e){ie(e),je("")}))},closeEdit:function(){return je("")}})]})})};i.a.render(Object(l.jsx)(c.a.StrictMode,{children:Object(l.jsx)(D,{})}),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.8f4fff11.chunk.js.map