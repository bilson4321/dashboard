import{g as n,h as c,d,k as i,j as e}from"./index-DCBEPbFM.js";function u(s){const{navigate:r}=n(),l=c({strict:!1,select:a=>a.pathname}),o=({from:a,...t})=>r({from:t!=null&&t.to?l:void 0,...t});return d.useCallback(o,[])}const x=i("/")({component:m});function m(){const s=u();return e.jsx("div",{className:"container mx-auto",children:e.jsx("div",{className:"flex justify-center items-center h-screen",children:e.jsx("div",{className:"rounded-lg shadow-lg bg-white p-8",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h1",{className:"text-4xl font-bold",children:"Welcome to the app"}),e.jsx("p",{className:"text-lg",children:"Please enter your credentials to access the dashboard"}),e.jsxs("div",{className:"my-4",children:[e.jsx("input",{type:"text",className:"border-2 border-gray-300 p-2 mt-4 w-full rounded-lg",placeholder:"Username"}),e.jsx("input",{type:"password",className:"border-2 border-gray-300 p-2 mt-4 w-full rounded-lg",placeholder:"Password"})]}),e.jsx("button",{onClick:()=>s({to:"/home"}),className:"bg-blue-500 text-white p-2 rounded-lg w-full",children:"Login"})]})})})})}export{x as Route};