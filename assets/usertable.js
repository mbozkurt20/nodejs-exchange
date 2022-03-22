axios({
    method:'get',
    url:'http://localhost:3000/api/users'
}).then((resp)=>{
    for(var i=0; i<resp.data.length; i++){
    $('#userTable').append(`<strong>${resp.data[i]['email']}</strong>`)
    console.log(resp.data[i]['email'])
}
}).catch(err=>{
    console.log({error: err})
})