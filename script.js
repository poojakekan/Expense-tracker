document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');

    // Load expenses from local storage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Function to display expenses
    function displayExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach(function(expense, index) {
            const div = document.createElement('div');
            div.classList.add('expense');
            div.innerHTML = `
                <p>Amount: $${expense.amount}</p>
                <p>Category: ${expense.category}</p>
                <button class="delete" data-index="${index}">Delete</button>
            `;
            expenseList.appendChild(div);
        });
    }

    displayExpenses();

    // Event listener for form submission
    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;

        if (isNaN(amount) || category === '') {
            alert('Please enter valid amount and select a category.');
            return;
        }

        const expense = {
            amount: amount.toFixed(2),
            category: category
        };

        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        displayExpenses();

        expenseForm.reset();
    });

    // Event listener for delete button click
    expenseList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            const index = event.target.dataset.index;
            expenses.splice(index, 1);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            displayExpenses();
        }
    });
});