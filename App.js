class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this. year = year;
    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4 text-white">
                <div class="card-body">
                    <strong>Product Name</strong>: ${product.name}
                    <strong>Product Price</strong>: ${product.price}
                    <strong>Product Year</strong>: ${product.year}
                    <a href="#" class="btn btn-danger ml-1" name="delete">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
        if(element.name === "delete") {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product successfully deleted', 'primary');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-3`;
        div.appendChild(document.createTextNode(message));
        // Showing in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

// DOM EVENTS
document.getElementById('product-form').addEventListener('submit', function (event) {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    const product = new Product(name, price, year);

    const ui = new UI();
    if(name === '' || price === '' || year === '') {
        return ui.showMessage('Please complete fields', 'danger');
    }
    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage('Product successfully added', 'success');

    // Cancela el comportamiento por defecto del formulario y no se recarga la página al hacer click en save:
    event.preventDefault();
});

document.getElementById('product-list').addEventListener('click', function(event) {
    const ui = new UI();
    ui.deleteProduct(event.target);
})