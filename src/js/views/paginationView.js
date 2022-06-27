import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1, and thera re other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupNxtBtn(curPage, numPages);
    }

    //Last Page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupPrvBtn(curPage, numPages);
    }
    //Other page
    if (curPage < numPages) {
      return ` ${this._generateMarkupPrvBtn(
        curPage,
        numPages
      )}${this._generateMarkupNxtBtn(curPage, numPages)}
      `;
    }
    //Page1, and there are no other pages
    return '';
  }

  _generateMarkupNxtBtn(curPage, numPages) {
    // const curPage = this._data.page;
    return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}/${numPages}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  _generateMarkupPrvBtn(curPage, numPages) {
    return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}/${numPages}</span>
      </button>
    `;
  }
}

export default new PaginationView();
