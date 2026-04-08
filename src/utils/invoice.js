export const generateCSV = (cartItems, totals) => {
    // Using current date for the invoice
    const dateStr = new Date().toISOString().split('T')[0];

    const topRow = [`Invoice Date: ${dateStr}`];
    const headers = ['Item Name', 'Quantity', 'Price', 'Total Price'];
    
    const rows = cartItems.map(item => [
        `"${item.name}"`, 
        item.quantity, 
        item.price, 
        item.price * item.quantity
    ]);
    
    // Add totals row
    rows.push(['', '', '', '']);
    rows.push(['Order Total', '', '', totals.total]);
    
    return [topRow.join(','), headers.join(','), ...rows.map(r => r.join(','))].join('\n');
};
