import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkupBtns(curPage, numPages) {
    const forward = ` 
     <button data-goto="${
       curPage + 1
     }" class="btn--inline pagination__btn--next">
    <span>Page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>
`;

    const back = `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
       <svg class="search__icon">
         <use href="${icons}#icon-arrow-left"></use>
       </svg>
       <span>Page ${curPage - 1}</span>
     </button>
  `;

    if (numPages === 1) return '';

    if (curPage === 1 && numPages > 1) return forward;

    if (curPage === numPages && numPages > 1) return back;

    return back + forward;
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;

    return this._generateMarkupBtns(curPage, numPages);
    // // Page1, and there other pages
    // if (curPage === 1 && numPages > 1) {
    //   console.log(this._generateMarkupBtns(curPage, numPages));
    //   return this._generateMarkupBtns(curPage, numPages);
    // }

    // // Last page
    // if (curPage === numPages && numPages > 1) {
    //   return this._generateMarkupBtns(curPage, numPages);
    // }

    // // other page

    // if (curPage < numPages) {
    //   return this._generateMarkupBtns(curPage, numPages);
    // }

    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
