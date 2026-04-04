export const generateCSV = (cartItems, totals) => {
    const headers = ['Item Name', 'Quantity', 'Price', 'Total Price', 'Date'];
    
    // Using current date for the invoice
    const dateStr = new Date().toISOString().split('T')[0];
    
    const rows = cartItems.map(item => [
        `"${item.name}"`, 
        item.quantity, 
        item.price, 
        item.price * item.quantity, 
        dateStr
    ]);
    
    // Add totals row
    rows.push(['', '', '', '', '']);
    rows.push(['Order Total', '', '', totals.total, '']);
    
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
};
