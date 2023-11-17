

const form=document.querySelector('#form')

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const details={
        title:document.querySelector('#title').value,
        imageURL:document.querySelector('#imageURL').value,
        price:document.querySelector('#price').value,
        description:document.querySelector('#description').value
    }
    axios.post('http://localhost:3000/shop/product',details).then(res=>{
        console.log(res.data.message)
    })
})