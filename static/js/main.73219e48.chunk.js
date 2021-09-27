(this.webpackJsonpcalendar=this.webpackJsonpcalendar||[]).push([[0],{13:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),o=n(6),r=n.n(o),i=n(3),s=n(2),d=n.n(s),l=(n(13),n(4)),u=n(0);var j=function(e){var t=e.todo,n=e.onDelete,a=e.onToggle;return Object(u.jsx)("div",{className:"todo",children:Object(u.jsxs)("div",{className:"".concat(!0===t.done?"reminder":""),children:[Object(u.jsx)("span",{className:"todo-text",children:t.text}),Object(u.jsx)("span",{className:"todo-time_date",children:t.time}),Object(u.jsx)("span",{className:"todo-time_date",children:t.date}),Object(u.jsxs)("div",{children:[Object(u.jsx)(l.a,{style:{color:"#777777",cursor:"pointer",fontSize:"1.1rem"},onClick:function(){return a({id:t._id,done:t.done})}}),Object(u.jsx)(l.d,{style:{color:"#777777",cursor:"pointer",marginLeft:"1px",marginRight:"-5px"},onClick:function(){return n(t._id)}})]})]})})};var h=function(e){var t=e.todos,n=e.onDelete,a=e.onToggle;return void 0===t?Object(u.jsx)("div",{className:"aside-container alltodos-container loading",children:"Loading..."}):Object(u.jsxs)("div",{className:"aside-container alltodos-container",children:[Object(u.jsx)("h1",{children:"All Todos"}),t.sort((function(e,t){return d()(t.date,"DD-MM-YYYY")<d()(e.date,"DD-MM-YYYY")?1:-1})).map((function(e){return Object(u.jsx)(j,{todo:e,onDelete:n,onToggle:a},e._id)}))]})};var b=function(e){var t,n=e.day,a=e.api,c=e.month,o=e.clickedDay,r=e.colorDayHandler,i=e.todos,s=d()().format("DD-MM-YYYY");if(t="31"===n?31:d()(n,"DD-MM-YYYY").format("D"),void 0===i)return Object(u.jsx)("div",{});var l=n+"-"+c,j=0,h=d()(l,"DD-MM-YYYY").format("YYYY-MM-DD");return Object(u.jsxs)("div",{onMouseDown:function(e){document.querySelectorAll("*").forEach((function(e){e.classList.remove("clickedday")}))},onClick:function(e){if(10===e.target.id.length){var t=e.target.id,n={date:t.slice(-2),year:t.slice(-7,-2),mon:t.replace(/ .*/,""),id:e.target.id};o(n),r(t)}else{var a=e.target.parentNode.id,c={date:a.slice(-2),year:a.slice(-7,-2),mon:a.replace(/ .*/,""),id:e.target.parentNode.id};o(c),r(a)}},id:l,className:"".concat(l===s?"days-day_cont currentday":"days-day_cont"),children:[Object(u.jsxs)("h3",{children:[t,a.filter((function(e){return e.datum===h})).map((function(e){return Object(u.jsx)("span",{className:"days-api",children:e.helgdag},e.datum)}))]}),i.sort((function(e,t){return t.time<e.time?1:-1})).filter((function(e){return e.date===l})).map((function(e){return j++,Object(u.jsxs)("div",{className:"inline day-todo",children:["\u30fb",e.text]},e._id)})),Object(u.jsx)("div",{className:"days-todo_count",children:0===j?"":j+" Todo:"})]})},p=n(7),m=n.n(p);var f=function(){return Object(u.jsx)(m.a,{type:"spin",color:"rgb(241, 136, 139)",height:"15%",width:"15%",className:"loading"})};d.a.updateLocale("sv",{week:{dow:1}});var O=function(e){for(var t=e.days,n=e.firstDayOfMonth,c=parseInt(n,10),o=[],r=0;r<c;r++)o.push(r);var s=d.a.weekdaysShort(!0).map((function(e){return Object(u.jsx)("div",{className:"weekdays-day_cont",children:e},e)})),l=function(t){e.clickedDay(t)},j=Object(a.useState)(""),h=Object(i.a)(j,2),p=h[0],m=h[1],O=function(e){m(e)};return Object(a.useEffect)((function(){""!==p&&document.getElementById(p).classList.add("clickedday")}),[p]),Object(u.jsxs)("section",{className:"calendar-container",children:[Object(u.jsx)("div",{className:"weekdays-container",children:s}),Object(u.jsxs)("div",{className:"days-container",children:[o.map((function(e,t){return Object(u.jsx)("div",{className:"days-day_cont empty"},t)})),void 0!==t?t.map((function(t){return Object(u.jsx)(b,{month:e.monthInNr,day:t,api:e.api,clickedDay:l,colorDayHandler:O,todos:e.todos},e.monthInNr+t)})):Object(u.jsx)(f,{})]})]})};var x=function(e){var t=d()(e.month,"MM-YYYY").format("MMMM YYYY");return Object(u.jsxs)("header",{children:[Object(u.jsxs)("div",{className:"header-name_btn",children:[Object(u.jsx)("div",{className:"header-username",children:e.user}),Object(u.jsx)("button",{onClick:e.logOutHandler,className:"logOutBtn",children:"Sign out"})]}),Object(u.jsxs)("div",{className:"header",children:[Object(u.jsx)(l.b,{type:"submit",onClick:function(){e.changeMonth("back")},className:"header-arrow"}),Object(u.jsx)("h1",{children:t}),Object(u.jsx)(l.c,{type:"submit",onClick:function(){e.changeMonth("forward")},className:"header-arrow"})]})]})};var g=function(e){var t=Object(a.useState)(""),n=Object(i.a)(t,2),c=n[0],o=n[1],r=Object(a.useState)(""),s=Object(i.a)(r,2),d=s[0],l=s[1];return Object(u.jsx)("div",{children:Object(u.jsxs)("form",{onSubmit:function(t){var n={text:c,time:d};t.preventDefault(),e.inputToDo(n),o(""),l(),document.getElementById("appt").value=""},children:[Object(u.jsx)("input",{onChange:function(e){o(e.target.value)},type:"text",value:c,placeholder:"New Todo",id:"newTodoInput",maxLength:"20",required:!0}),Object(u.jsx)("input",{type:"time",id:"appt",name:"appt",onChange:function(e){l(e.target.value)}}),Object(u.jsx)("button",{type:"submit",id:"newTodoBtn",children:"+"})]})})};var v=function(e){var t=e.clickedDay,n=e.todos,a=e.onDelete,c=e.onToggle,o=d()(t,"DD-MM-YYYY").format("D MMMM YY");return void 0===n?Object(u.jsx)("div",{className:"aside-container loading",children:"Loading..."}):Object(u.jsxs)("article",{className:"today-todo_container",children:[Object(u.jsx)("h1",{children:o}),n.sort((function(e,t){return t.time<e.time?1:-1})).filter((function(e){return e.date===t})).map((function(e){return Object(u.jsx)("div",{className:"draggables todo",draggable:"true",children:Object(u.jsxs)("div",{className:"".concat(!0===e.done?"reminder":""),children:[e.text,"  ",Object(u.jsx)("span",{className:"todo-time_date",children:e.time}),Object(u.jsx)("span",{className:"todo-time_date",children:e.date}),Object(u.jsxs)("div",{children:[Object(u.jsx)(l.a,{style:{color:"#777777",cursor:"pointer",fontSize:"1.1rem"},onClick:function(){return c({id:e._id,done:e.done})}}),Object(u.jsx)(l.d,{style:{color:"#777777",cursor:"pointer",marginLeft:"1px",marginRight:"-5px"},onClick:function(){return a(e._id)}})]})]})},e._id)}))]})};var y=function(e){var t=e.userInfo,n=e.newUserInfo,c=e.errorMsg,o=Object(a.useState)(""),r=Object(i.a)(o,2),s=r[0],d=r[1],l=Object(a.useState)(""),j=Object(i.a)(l,2),h=j[0],b=j[1],p=Object(a.useState)(!0),m=Object(i.a)(p,2),f=m[0],O=m[1],x=Object(a.useState)(""),g=Object(i.a)(x,2),v=g[0],y=g[1],Y=Object(a.useState)(""),N=Object(i.a)(Y,2),M=N[0],D=N[1],S=Object(a.useState)(""),k=Object(i.a)(S,2),w=k[0],C=k[1];return Object(u.jsx)(u.Fragment,{children:f?Object(u.jsx)("div",{className:"login-page",children:Object(u.jsx)("div",{id:"logInContainer",children:Object(u.jsx)("div",{id:"logInInputs",children:Object(u.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t({email:s,password:h})},children:[Object(u.jsx)("input",{type:"email",placeholder:"EMAIL",id:"userName",className:"logInField",onChange:function(e){d(e.target.value.toLowerCase())},value:s,required:!0}),Object(u.jsx)("input",{type:"password",placeholder:"PASSWORD",id:"passWord",className:"logInField",onChange:function(e){b(e.target.value)},value:h,required:!0}),c?Object(u.jsx)("p",{id:"errorMsg",children:"Sorry, invalid login!"}):"",Object(u.jsx)("button",{id:"logInBtn",children:"Sign in"}),Object(u.jsx)("p",{onClick:function(){return O(!f)},id:"signUp",children:"Create account"})]})})})}):Object(u.jsx)("div",{className:"login-page",children:Object(u.jsx)("div",{id:"newLogInContainer",children:Object(u.jsx)("div",{id:"logInInputs",children:Object(u.jsxs)("form",{onSubmit:function(e){e.preventDefault(),n({userName:v,email:M,passWord:w})},children:[Object(u.jsx)("input",{type:"text",placeholder:"CHOOSE NAME",id:"newUserName",className:"logInField",required:"required",onChange:function(e){return y(e.target.value)},value:v}),Object(u.jsx)("input",{type:"email",placeholder:"CHOOSE EMAIL",id:"newEmail",className:"logInField",required:"required",onChange:function(e){return D(e.target.value.toLowerCase())},value:M}),Object(u.jsx)("input",{type:"password",placeholder:" CHOOSE PASSWORD",id:"newPassWord",className:"logInField",required:"required",onChange:function(e){return C(e.target.value)},value:w}),Object(u.jsx)("p",{id:"newErrorMsg"}),Object(u.jsx)("button",{id:"createAccount",children:"Create account"}),Object(u.jsx)("p",{onClick:function(){return O(!f)},id:"signUp",children:"Have an account? Sign in"})]})})})})})};var Y=function(e){var t=e.notes,n=e.onDelete;return void 0===t?Object(u.jsx)("div",{className:"aside-container loading",children:"Loading..."}):Object(u.jsxs)("article",{className:"today-todo_container",children:[Object(u.jsx)("h1",{children:"Notes"}),t.map((function(e){return Object(u.jsx)("div",{className:"todo",children:Object(u.jsxs)("div",{children:[e.note,"  ",Object(u.jsx)("div",{children:Object(u.jsx)(l.d,{style:{color:"#777777",cursor:"pointer",marginLeft:"1px",marginRight:"-5px"},onClick:function(){return n(e._id)}})})]})},e._id)}))]})};var N=function(e){var t=e.newNote,n=Object(a.useState)(""),c=Object(i.a)(n,2),o=c[0],r=c[1];return Object(u.jsx)("div",{children:Object(u.jsxs)("form",{onSubmit:function(e){var n=o;e.preventDefault(),t(n),r("")},children:[Object(u.jsx)("input",{onChange:function(e){r(e.target.value)},type:"text",value:o,placeholder:"New Note",id:"newNoteInput",required:!0}),Object(u.jsx)("button",{type:"submit",id:"newTodoBtn",children:"+"})]})})};d.a.updateLocale("sv",{week:{dow:1}});var M=function(){var e,t=Object(a.useState)(""),n=Object(i.a)(t,2),c=n[0],o=n[1],r=Object(a.useState)(),s=Object(i.a)(r,2),l=s[0],j=s[1],b=Object(a.useState)(d()().format("MM-YYYY")),p=Object(i.a)(b,2),m=p[0],f=p[1],M=function(e){var t=d()(e,"MM-YYYY").add(-1,"month").format("MM-YYYY"),n=d()(m,"MM-YYYY").add(-1,"month").format("MM-YYYY");return f(n),t},D=function(e){var t=d()(e,"MM-YYYY").add(1,"month").format("MM-YYYY"),n=d()(m,"MM-YYYY").add(1,"month").format("MM-YYYY");return f(n),t},S=Object(a.useState)(m.slice(-4)),k=Object(i.a)(S,2),w=k[0],C=k[1],I=Object(a.useState)([]),_=Object(i.a)(I,2),E=_[0],L=_[1],T="";Object(a.useEffect)((function(){e=m.slice(0,2),C(m.slice(-4)),fetch(T+="https://sholiday.faboul.se/dagar/v2.1/"+w+"/"+e).then((function(e){return e.json()})).then((function(e){L(e.dagar)}))}),[m]);var q=Object(a.useState)([]),J=Object(i.a)(q,2),A=J[0],H=J[1],B=Object(a.useState)(d()()),F=Object(i.a)(B,2),U=F[0],R=F[1];Object(a.useEffect)((function(){!function(){var e=Array.from({length:d()(m,"MM").daysInMonth()},(function(e,t){return d()(m,"MM").startOf("month").add(t,"days").format("DD")}));H(e)}(),function(){var e=d()(m,"MM").startOf("month").add(-1,"days").format("d");R(e)}()}),[m]);var W=Object(a.useState)(d()().format("DD-MM-YYYY")),P=Object(i.a)(W,2),z=P[0],G=P[1],K=Object(a.useState)(d()().format("DD-MM-YYYY")),Q=Object(i.a)(K,2),V=Q[0],X=Q[1],Z=Object(a.useState)(),$=Object(i.a)(Z,2),ee=$[0],te=$[1],ne=Object(a.useState)(),ae=Object(i.a)(ne,2),ce=(ae[0],ae[1]);Object(a.useEffect)((function(){var e=c.id;fetch("https://calendar-backend-mathildap.herokuapp.com/get",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify({userId:e})}).then((function(e){return e.json()})).then((function(e){return te(e)}))}),[c]);var oe=function(e){var t={id:e,userId:c.id};fetch("https://calendar-backend-mathildap.herokuapp.com/delete",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){te(e)}))},re=function(e){var t;t=!0!==e.done;var n={id:e.id,done:t,userId:c.id};fetch("https://calendar-backend-mathildap.herokuapp.com/update",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify(n)}).then((function(e){return e.json()})).then((function(e){console.log(e)}))},ie=Object(a.useState)(),se=Object(i.a)(ie,2),de=se[0],le=se[1];return Object(a.useEffect)((function(){var e=c.id;fetch("https://calendar-backend-mathildap.herokuapp.com/notes/get",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify({userId:e})}).then((function(e){return e.json()})).then((function(e){return le(e)}))}),[c]),Object(u.jsx)("main",{children:""===c?Object(u.jsx)(y,{userInfo:function(e){fetch("https://calendar-backend-mathildap.herokuapp.com/users",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify({info:e})}).then((function(e){return e.json()})).then((function(e){"error"!==e?o({userName:e.username,id:e.id}):j("error")}))},newUserInfo:function(e){fetch("https://calendar-backend-mathildap.herokuapp.com/users/new",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify({newUser:e})}).then((function(e){return e.json()})).then((function(e){o({userName:e.username,id:e.id})}))},errorMsg:l}):Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(x,{month:m,changeMonth:function(e){if("back"===e){var t=M(m);f(t)}else if("forward"===e){var n=D(m);f(n)}},user:c.userName,logOutHandler:function(){o("")}}),Object(u.jsxs)("section",{className:"main-container",children:[Object(u.jsx)(O,{monthInNr:m,days:A,api:E,firstDayOfMonth:U,clickedDay:function(e){X(e.id),G(e.id)},todos:ee,onDelete:oe,onToggle:re}),Object(u.jsxs)("aside",{children:[Object(u.jsxs)("div",{className:"aside-container",children:[Object(u.jsx)(v,{clickedDay:z,todos:ee,onDelete:oe,onToggle:re}),Object(u.jsx)(g,{clickedDay:z,inputToDo:function(e){var t={userId:c.id,text:e.text,time:e.time,date:V,done:!1};ce(t),fetch("https://calendar-backend-mathildap.herokuapp.com/new",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){return te(e)}))}})]}),Object(u.jsxs)("div",{className:"aside-container",children:[Object(u.jsx)(Y,{notes:de,onDelete:function(e){var t={id:e,userId:c.id};fetch("https://calendar-backend-mathildap.herokuapp.com/notes/delete",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){le(e)}))}}),Object(u.jsx)(N,{newNote:function(e){var t={userId:c.id,note:e,done:!1};fetch("https://calendar-backend-mathildap.herokuapp.com/notes/newNote",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){console.log(e),le(e)}))}})]}),Object(u.jsx)(h,{todos:ee,onDelete:oe,onToggle:re})]})]})]})})};r.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(M,{})}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.73219e48.chunk.js.map