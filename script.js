document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const expensesList = document.getElementById('expenses-list');

    // Load expenses from local storage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Render expenses
    renderExpenses();

    // Add expense
    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const expenseName = document.getElementById('expense-name').value.trim();
        const expenseAmount = parseFloat(document.getElementById('expense-amount').value.trim());
        const expenseCategory = document.getElementById('expense-category').value;

        if (expenseName && !isNaN(expenseAmount)) {
            const expense = {
                id: Date.now(),
                name: expenseName,
                amount: expenseAmount,
                category: expenseCategory
            };
            expenses.push(expense);
            saveExpenses();
            renderExpenses();
            // Clear input fields
            document.getElementById('expense-name').value = '';
            document.getElementById('expense-amount').value = '';
        }
    });

    // Render expenses
    function renderExpenses() {
        expensesList.innerHTML = '';
        
        let totalAmount = 0;
        expenses.forEach(function(expense) {
            const li = document.createElement('li');
            li.textContent = `${expense.name}: $${expense.amount.toFixed(2)} (${expense.category})`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                deleteExpense(expense.id);
            });
            li.appendChild(deleteButton);
            expensesList.appendChild(li);

            totalAmount += expense.amount;
        });
        const totalElement = document.getElementById('totalAmount');
        totalElement.textContent = `Total: $${totalAmount.toFixed(2)}`;
    }

    // Delete expense
    function deleteExpense(id) {
        expenses = expenses.filter(expense => expense.id !== id);
        saveExpenses();
        renderExpenses();
    }

    // Save expenses to local storage
    function saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

});