const overlay = document.querySelector('#overlay')
const images = document.querySelectorAll('.small_img')
const display_image = document.querySelector('.display_image')

const cart = document.querySelector('.cart_icon')
const cart_overlay = document.querySelector('.cart_overlay')
const badge = document.querySelector('.notification_badge')

const qty_buttons = document.querySelectorAll('.qty_btn')
const qty_amount = document.querySelector('.qty_amount')
const add_to_cart_btn = document.querySelector('.add_to_cart')
const cart_contents = document.querySelector('.cart_contents')

const hamburger = document.querySelector('.hamburger_menu')
const mobile_overlay = document.querySelector('.mobile_navigation')

const image_paths = [
    'images/image-product-1.jpg',
    'images/image-product-2.jpg',
    'images/image-product-3.jpg',
    'images/image-product-4.jpg',
]

let current_image = 'images/image-product-1.jpg'
display_image.setAttribute('data-id', 0)
let id = Number(display_image.getAttribute('data-id'))

function changeAmount(value) {
    if(value == '+') {
        const new_qty = Number(qty_amount.textContent) + 1
        qty_amount.textContent = new_qty
    } else {
        if (Number(qty_amount.textContent) - 1 < 0) {
            return
        }
        const new_qty = Number(qty_amount.textContent) - 1
        qty_amount.textContent = new_qty
    }
}

function toggleMenu() {
    mobile_overlay.classList.remove('hidden')

    const close_menu = document.querySelector('.close_mobile_nav')
    close_menu.addEventListener('click', () => mobile_overlay.classList.add('hidden'))
}

function appendImage() {

    overlay.innerHTML = `
        <div class='modal_container'>
            <img src="images/icon-close.svg" alt="" class="close_overlay">
            <img src="images/icon-previous.svg" alt="" class="left_arrow">
            <img src="images/icon-next.svg" alt="" class="right_arrow">
            <img src=${current_image} alt="" class="lightbox_img">

            <div class="modal_images">
                <div class='small_img_container_modal'>
                    <img class="small_img" data-number="0" src="images/image-product-1-thumbnail.jpg" alt="">
                </div>
                <div class='small_img_container_modal'>
                    <img class="small_img" data-number="1" src="images/image-product-2-thumbnail.jpg" alt="">
                </div>
                <div class='small_img_container_modal'>
                    <img class="small_img" data-number="2" src="images/image-product-3-thumbnail.jpg" alt="">
                </div>
                <div class='small_img_container_modal'>
                    <img class="small_img" data-number="3" src="images/image-product-4-thumbnail.jpg" alt="">
                </div>
            </div>
        </div>
    `

    function changeDirection(direction) {
        if(direction == 'left') {
            if(id <= 0) {
                id = 3
            } else {
                id -= 1
            }
        } else {
            if(id == 3) {
                id = 0
            } else {
                id += 1
            }
        }

        const lightbox_img = document.querySelector('.lightbox_img')
        lightbox_img.setAttribute('src', image_paths[id])
        display_image.setAttribute('data-id', id)
    }

    const close_modal = document.querySelector('.close_overlay')
    close_modal.addEventListener('click', removeImage)

    const left_arrow = document.querySelector('.left_arrow')
    const right_arrow = document.querySelector('.right_arrow')
    toggleLightbox()

    left_arrow.addEventListener('click', () => changeDirection('left'))
    right_arrow.addEventListener('click', () => changeDirection('right'))
}

function changeDisplayImage(image) {
    const image_src = image_paths[image.dataset.number]
    current_image = image_src

    images.forEach(img => img.classList.remove('active_img'))
    image.classList.add('active_img')
    display_image.src = image_src
    display_image.setAttribute('data-id', image.dataset.number)
}

function removeImage() {
    overlay.removeChild(overlay.firstElementChild)
    toggleLightbox()
}

function addToCart() {
    let qty = Number(qty_amount.textContent)
    let price = 125.00 * qty

    if(qty <= 0) {
        return
    }

    cart_contents.innerHTML = `
    <div class="cart_item">
        <img class="cart_img" src="images/image-product-1-thumbnail.jpg" alt="">
        <div class="product_details">
          <p>Fall Limited Edition Sneakers</p>
          <p>$125 x <span class="product_qty">${qty}</span> <span class="product_total">$${price}</span></p>
        </div>
        <img class="delete_icon" src="images/icon-delete.svg" alt="">
      </div>
      <div class="checkout_btn">Checkout</div>
    `
    badge.classList.remove('hidden')
    badge.innerText = qty

    const delete_cart_icon = document.querySelector('.delete_icon')
    delete_cart_icon.addEventListener('click', () => {
        cart_contents.innerHTML = `
        <p class="empty_cart">Your cart is empty.</p>
        `
        badge.innerText = 0
        badge.classList.add('hidden')   

    })
}

function toggleCart() {
    cart_overlay.classList.toggle('hidden')
    cart.classList.toggle('cart_open')
}

function toggleLightbox() {
    overlay.classList.toggle('hidden')
}

display_image.addEventListener('click', appendImage)
images.forEach(img => {
    img.addEventListener('click', () => changeDisplayImage(img))
})

qty_buttons.forEach(btn => {
    btn.addEventListener('click', () => changeAmount(btn.textContent))
})
cart.addEventListener('click', toggleCart)
add_to_cart_btn.addEventListener('click', addToCart)

hamburger.addEventListener('click', toggleMenu)