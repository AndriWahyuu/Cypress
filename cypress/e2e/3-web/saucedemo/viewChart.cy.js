describe('Magento view Cart Test', () => {
  beforeEach(() => {
    // Buka halaman utama Magento
    cy.visit('https://magento.softwaretestingboard.com/');
  });

  it('should add a product to the cart and update quantity', () => {
    // Cari produk dan pilih produk pertama
    cy.get('.product-item-link').first().click();

    // Tambahkan produk ke keranjang
    cy.get('.action.tocart.primary').click();

    // Verifikasi bahwa produk berhasil ditambahkan ke keranjang
    cy.get('.message-success').should('be.visible').and('contain', 'You added');

    // Buka keranjang belanja
    cy.get('.minicart-wrapper').click();

    // Verifikasi bahwa produk muncul di dalam keranjang
    cy.get('.cart.item').should('have.length', 1);

    // Update kuantitas produk di keranjang
    const newQuantity = 2;
    cy.get('.cart.item').find('input.qty').clear().type(newQuantity);

    // Klik tombol untuk mengupdate kuantitas
    cy.get('.update-cart-item').click();

    // Verifikasi bahwa kuantitas produk telah diperbarui
    cy.get('.cart.item').find('input.qty').should('have.value', newQuantity);
  });

  it('should handle the case when adding an out-of-stock product to the cart', () => {
    // Cari produk yang tidak tersedia (out-of-stock)
    cy.contains('.product-item', 'Out of Stock').should('exist');

    // Pilih produk yang tidak tersedia
    cy.contains('.product-item', 'Out of Stock').click();

    // Verifikasi bahwa tombol "Add to Cart" tidak aktif
    cy.get('.add-to-cart-buttons .action-primary').should('be.disabled');
  });

  it('should handle the case when updating quantity with an invalid value', () => {
    // Cari produk dan pilih produk pertama
    cy.get('.product-item-link').first().click();

    // Tambahkan produk ke keranjang
    cy.get('.add-to-cart-buttons .action-primary').click();

    // Buka keranjang belanja
    cy.get('.action.showcart').click();

    // Verifikasi bahwa produk muncul di dalam keranjang
    cy.get('.cart.item').should('have.length', 1);

    // Update kuantitas produk di keranjang dengan nilai yang tidak valid
    const invalidQuantity = -1;
    cy.get('.cart.item').find('input.qty').clear().type(invalidQuantity);

    // Klik tombol untuk mengupdate kuantitas
    cy.get('.update-cart-item').click();

    // Verifikasi bahwa pesan kesalahan ditampilkan
    cy.get('.message-error').should('be.visible').and('contain', 'Please enter a valid number');
  });
}); 