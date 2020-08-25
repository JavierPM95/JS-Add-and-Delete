class Product {
    constructor(name, price, brand) {
        this.name =name;
        this.price = price;
        this.brand = brand;
    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML =`
            <div class="card-body text-center mb-4 bg-light text-dark">
                <div class="card-body">
                    <strong>Product Name</strong>: ${product.name} <br>
                    <strong>Product price</strong>: ${product.price} <br>
                    <strong>Product brand</strong>: ${product.brand} <br>
                    <a href="#" class="btn btn-danger" name="delete" >Delete</a>
                </div>
            </div>
        `; 
        productList.appendChild(element);
    }
    resetForm() {
        document.getElementById('product-form').reset();
    }
    
    deleteProduct(element) {
        if(element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product Delete Successfully', 'danger');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.print');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

// DOM Event

document.getElementById('product-form')
    .addEventListener('submit', function (e) {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const brand = document.getElementById('brand').value;
       
        const product = new Product(name, price, brand);

        const ui = new UI();

        if(name === '' || price === '' || brand === '') {
            return ui.showMessage('Please, complete the fields', 'danger');
        }

        ui.addProduct(product);
        ui.resetForm();
        ui.showMessage('Product Added Successfully', 'success');

        e.preventDefault();
    });


document.getElementById('product-list')
    .addEventListener('click', function(e) {
        const ui = new UI();
        ui.deleteProduct(e.target);
    });