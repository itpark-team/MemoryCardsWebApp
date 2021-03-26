function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
  /***/
  "./node_modules/@angular/localize/fesm2015/init.js":
  /*!*********************************************************!*\
    !*** ./node_modules/@angular/localize/fesm2015/init.js ***!
    \*********************************************************/

  /*! no static exports found */

  /***/
  function node_modulesAngularLocalizeFesm2015InitJs(module, exports) {
    /**
     * @license Angular v11.2.1
     * (c) 2010-2020 Google LLC. https://angular.io/
     * License: MIT
     */

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __globalThis = typeof globalThis !== 'undefined' && globalThis;

    var __window = typeof window !== 'undefined' && window;

    var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && self;

    var __global = typeof global !== 'undefined' && global; // Always use __globalThis if available; this is the spec-defined global variable across all
    // environments.
    // Then fallback to __global first; in Node tests both __global and __window may be defined.


    var _global = __globalThis || __global || __window || __self;
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * Tag a template literal string for localization.
     *
     * For example:
     *
     * ```ts
     * $localize `some string to localize`
     * ```
     *
     * **Providing meaning, description and id**
     *
     * You can optionally specify one or more of `meaning`, `description` and `id` for a localized
     * string by pre-pending it with a colon delimited block of the form:
     *
     * ```ts
     * $localize`:meaning|description@@id:source message text`;
     *
     * $localize`:meaning|:source message text`;
     * $localize`:description:source message text`;
     * $localize`:@@id:source message text`;
     * ```
     *
     * This format is the same as that used for `i18n` markers in Angular templates. See the
     * [Angular 18n guide](guide/i18n#template-translations).
     *
     * **Naming placeholders**
     *
     * If the template literal string contains expressions, then the expressions will be automatically
     * associated with placeholder names for you.
     *
     * For example:
     *
     * ```ts
     * $localize `Hi ${name}! There are ${items.length} items.`;
     * ```
     *
     * will generate a message-source of `Hi {$PH}! There are {$PH_1} items`.
     *
     * The recommended practice is to name the placeholder associated with each expression though.
     *
     * Do this by providing the placeholder name wrapped in `:` characters directly after the
     * expression. These placeholder names are stripped out of the rendered localized string.
     *
     * For example, to name the `items.length` expression placeholder `itemCount` you write:
     *
     * ```ts
     * $localize `There are ${items.length}:itemCount: items`;
     * ```
     *
     * **Escaping colon markers**
     *
     * If you need to use a `:` character directly at the start of a tagged string that has no
     * metadata block, or directly after a substitution expression that has no name you must escape
     * the `:` by preceding it with a backslash:
     *
     * For example:
     *
     * ```ts
     * // message has a metadata block so no need to escape colon
     * $localize `:some description::this message starts with a colon (:)`;
     * // no metadata block so the colon must be escaped
     * $localize `\:this message starts with a colon (:)`;
     * ```
     *
     * ```ts
     * // named substitution so no need to escape colon
     * $localize `${label}:label:: ${}`
     * // anonymous substitution so colon must be escaped
     * $localize `${label}\: ${}`
     * ```
     *
     * **Processing localized strings:**
     *
     * There are three scenarios:
     *
     * * **compile-time inlining**: the `$localize` tag is transformed at compile time by a
     * transpiler, removing the tag and replacing the template literal string with a translated
     * literal string from a collection of translations provided to the transpilation tool.
     *
     * * **run-time evaluation**: the `$localize` tag is a run-time function that replaces and
     * reorders the parts (static strings and expressions) of the template literal string with strings
     * from a collection of translations loaded at run-time.
     *
     * * **pass-through evaluation**: the `$localize` tag is a run-time function that simply evaluates
     * the original template literal string without applying any translations to the parts. This
     * version is used during development or where there is no need to translate the localized
     * template literals.
     * @param messageParts a collection of the static parts of the template string.
     * @param expressions a collection of the values of each placeholder in the template string.
     * @returns the translated string, with the `messageParts` and `expressions` interleaved together.
     */


    var $localize = function $localize(messageParts) {
      for (var _len = arguments.length, expressions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        expressions[_key - 1] = arguments[_key];
      }

      if ($localize.translate) {
        // Don't use array expansion here to avoid the compiler adding `__read()` helper unnecessarily.
        var translation = $localize.translate(messageParts, expressions);
        messageParts = translation[0];
        expressions = translation[1];
      }

      var message = stripBlock(messageParts[0], messageParts.raw[0]);

      for (var i = 1; i < messageParts.length; i++) {
        message += expressions[i - 1] + stripBlock(messageParts[i], messageParts.raw[i]);
      }

      return message;
    };

    var BLOCK_MARKER = ':';
    /**
     * Strip a delimited "block" from the start of the `messagePart`, if it is found.
     *
     * If a marker character (:) actually appears in the content at the start of a tagged string or
     * after a substitution expression, where a block has not been provided the character must be
     * escaped with a backslash, `\:`. This function checks for this by looking at the `raw`
     * messagePart, which should still contain the backslash.
     *
     * @param messagePart The cooked message part to process.
     * @param rawMessagePart The raw message part to check.
     * @returns the message part with the placeholder name stripped, if found.
     * @throws an error if the block is unterminated
     */

    function stripBlock(messagePart, rawMessagePart) {
      return rawMessagePart.charAt(0) === BLOCK_MARKER ? messagePart.substring(findEndOfBlock(messagePart, rawMessagePart) + 1) : messagePart;
    }
    /**
     * Find the end of a "marked block" indicated by the first non-escaped colon.
     *
     * @param cooked The cooked string (where escaped chars have been processed)
     * @param raw The raw string (where escape sequences are still in place)
     *
     * @returns the index of the end of block marker
     * @throws an error if the block is unterminated
     */


    function findEndOfBlock(cooked, raw) {
      /***********************************************************************************************
       * This function is repeated in `src/utils/messages.ts` and the two should be kept in sync.
       * The reason is that this file is marked as having side-effects, and if we import `messages.ts`
       * into it, the whole of `src/utils` will be included in this bundle and none of the functions
       * will be tree shaken.
       ***********************************************************************************************/
      for (var cookedIndex = 1, rawIndex = 1; cookedIndex < cooked.length; cookedIndex++, rawIndex++) {
        if (raw[rawIndex] === '\\') {
          rawIndex++;
        } else if (cooked[cookedIndex] === BLOCK_MARKER) {
          return cookedIndex;
        }
      }

      throw new Error("Unterminated $localize metadata block in \"".concat(raw, "\"."));
    }
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // Attach $localize to the global context, as a side-effect of this module.


    _global.$localize = $localize; //# sourceMappingURL=init.js.map

    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
  /*!**************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
    \**************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppAppComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<router-outlet></router-outlet>\r\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/deck-cards-home/add-card-dialog.html":
  /*!********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/deck-cards-home/add-card-dialog.html ***!
    \********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppDeckCardsHomeAddCardDialogHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<h2 mat-dialog-title>Add card:</h2>\r\n<mat-dialog-content class=\"mat-typography\">\r\n  <label>\r\n    Front text: <input type=\"text\" [ngModel]=\"card.frontText\" (ngModelChange)=\"card.frontText=$event\">\r\n  </label>\r\n  <br>\r\n\r\n  <label>\r\n    Back text: <input type=\"text\" [ngModel]=\"card.backText\" (ngModelChange)=\"card.backText=$event\">\r\n  </label>\r\n  <br>\r\n\r\n  <label>\r\n    Front image: <input type=\"text\" [ngModel]=\"card.frontImage\" (ngModelChange)=\"card.frontImage=$event\">\r\n  </label>\r\n  <br>\r\n\r\n  <label>\r\n    Back image: <input type=\"text\" [ngModel]=\"card.backImage\" (ngModelChange)=\"card.backImage=$event\">\r\n  </label>\r\n  <br>\r\n\r\n  <label>\r\n    Color: <input type=\"text\" [ngModel]=\"card.color\" (ngModelChange)=\"card.color=$event\">\r\n  </label>\r\n  <br>\r\n\r\n\r\n</mat-dialog-content>\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-raised-button mat-dialog-close>Cancel</button>\r\n  <button mat-raised-button color=\"accent\" [mat-dialog-close]=\"card\" >Add</button>\r\n</mat-dialog-actions>\r\n\r\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/deck-cards-home/deck-cards-home.component.html":
  /*!******************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/deck-cards-home/deck-cards-home.component.html ***!
    \******************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppDeckCardsHomeDeckCardsHomeComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"container\">\r\n  <div class=\"row justify-content-center\">\r\n    <div class=\"col-8\">\r\n      <div class=\"row justify-content-between\">\r\n        <button mat-raised-button color=\"accent\" (click)=\"goBack()\">back</button>\r\n        <button mat-raised-button color=\"warn\" (click)=\"showDeleteDeckDialog()\">delete</button>\r\n      </div>\r\n      <hr>\r\n      <div>\r\n        <h1 class=\"text-center\">Deck:</h1>\r\n        <h1 id=\"deck-title\" class=\"text-center font-weight-bold\">{{currentDeck.title}}</h1>\r\n      </div>\r\n      <div>\r\n        <h2 class=\"text-center\">Descritpion:</h2>\r\n        <h2 id=\"deck-description\" class=\"text-center font-weight-bold\">{{currentDeck.description}}</h2>\r\n      </div>\r\n      <hr>\r\n\r\n      <div class=\"row justify-content-center\">\r\n        <button class=\"row justify-content-center\" mat-raised-button (click)=\"showAddDialog()\">+ add card</button>\r\n      </div>\r\n\r\n      <div>\r\n        <ng-container *ngFor=\"let card of currentCards\">\r\n          <mat-card (click)=\"changeCardSide()\" [ngStyle]=\"{'background-color': card.color}\" >\r\n            <div [ngSwitch]=\"cardSide\" class=\"ml-5 mr-4 mt-5\">\r\n<!--1 ng switch -->\r\n\r\n              <ng-template ngSwitchCase=\"front\">\r\n                <img mat-card-image src=\"{{card.frontImage}}\" class=\"img-fluid rounded\">\r\n              </ng-template>\r\n              <ng-template ngSwitchCase=\"back\">\r\n                <img mat-card-image src=\"{{card.backImage}}\" class=\"img-fluid rounded\">\r\n              </ng-template>\r\n            </div>\r\n            <div class=\"text-wrapper d-flex justify-content-center align-items-center\">\r\n              <div class=\"bg-light d-flex align-items-center\">\r\n                <mat-card-title class=\"text-center mt-4 align-items-center\" [ngSwitch]=\"cardSide\">\r\n                  <ng-template ngSwitchCase=\"front\"> {{card.frontText}}</ng-template>\r\n                  <ng-template ngSwitchCase=\"back\"> {{card.backText}}</ng-template>\r\n                </mat-card-title>\r\n              </div>\r\n            </div>\r\n            <mat-card-actions align=\"end\">\r\n              <button mat-raised-button color=\"primary\" (click)=\"showEditCardDialog(card)\"\r\n                      (click)=\"changeCardSide()\">Edit\r\n              </button>\r\n              <button mat-raised-button color=\"warn\" (click)=\"showDeleteCardDialog(card.id)\" (click)=\"changeCardSide()\">\r\n                delete\r\n              </button>\r\n            </mat-card-actions>\r\n          </mat-card>\r\n          <!--          БЫЛО БЫ НИХУЁВО СДЕЛАТЬ ТАК ЧТОБЫ ТОЛЬКО ОДНА КАРТОЧКА ВОРОЧАЛАСЬ ну можно их ещё и поменьше сделать так то))) и уголки закруглить, я не смог((\r\n          -->\r\n          <!--          я бы лично въебал поле ещё одно в класс-->\r\n        </ng-container>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/deck-cards-home/delete-dialog.html":
  /*!******************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/deck-cards-home/delete-dialog.html ***!
    \******************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppDeckCardsHomeDeleteDialogHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<h2 mat-dialog-title>Delete?</h2>\r\n\r\n\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-raised-button [mat-dialog-close]=\"false\">No</button>\r\n  <button mat-raised-button color=\"warn\" [mat-dialog-close]=\"true\" >Yes</button>\r\n</mat-dialog-actions>\r\n\r\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/deck-cards-home/edit-card-dialog.html":
  /*!*********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/deck-cards-home/edit-card-dialog.html ***!
    \*********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppDeckCardsHomeEditCardDialogHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<h2 mat-dialog-title>Edit editedCard:</h2>\r\n<mat-dialog-content class=\"mat-typography\">\r\n  <label>\r\n    front text: <input type=\"text\" [ngModel]=\"editedCard.frontText\" (ngModelChange)=\"editedCard.frontText=$event\" value=\"{{editedCard.frontText}}\">\r\n  </label>\r\n  <br>\r\n\r\n  <label>\r\n    back text: <input type=\"text\" [ngModel]=\"editedCard.backText\" (ngModelChange)=\"editedCard.backText=$event\" value=\"{{editedCard.backText}}\">\r\n  </label>\r\n  <br>\r\n\r\n  <label>\r\n    front image: <input type=\"text\" [ngModel]=\"editedCard.frontImage\" (ngModelChange)=\"editedCard.frontImage=$event\" value=\"{{editedCard.frontImage}}\">\r\n  </label>\r\n  <br>\r\n\r\n  <label>\r\n    back image: <input type=\"text\" [ngModel]=\"editedCard.backImage\" (ngModelChange)=\" editedCard.backImage=$event\" value=\"{{editedCard.backImage}}\">\r\n  </label>\r\n  <br>\r\n\r\n  <label>\r\n    color: <input type=\"text\" [ngModel]=\"editedCard.color\" (ngModelChange)=\"editedCard.color=$event\" value=\"{{editedCard.color}}\">\r\n  </label>\r\n\r\n  <br>\r\n\r\n</mat-dialog-content>\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-raised-button mat-dialog-close>Cancel</button>\r\n  <button mat-raised-button color=\"accent\" [mat-dialog-close]=\"editedCard\" >Done</button>\r\n</mat-dialog-actions>\r\n\r\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/deck-home/add-deck-dialog.html":
  /*!**************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/deck-home/add-deck-dialog.html ***!
    \**************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppDeckHomeAddDeckDialogHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<h2 mat-dialog-title>Add deck:</h2>\r\n<mat-dialog-content class=\"mat-typography\">\r\n  <label>\r\n    title: <input type=\"text\" [ngModel]=\"deck.title\" (ngModelChange)=\"deck.title=$event\">\r\n  </label>\r\n  <br>\r\n\r\n  <label>\r\n    description: <input type=\"text\" [ngModel]=\"deck.description\" (ngModelChange)=\"deck.description=$event\">\r\n  </label>\r\n  <br>\r\n\r\n  <label>\r\n    visibility: <input type=\"checkbox\" [ngModel]=\"deck.visibility\" (ngModelChange)=\"deck.visibility=$event\">\r\n  </label>\r\n  <br>\r\n\r\n</mat-dialog-content>\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-raised-button mat-dialog-close>Cancel</button>\r\n  <button mat-raised-button color=\"accent\" [mat-dialog-close]=\"deck\">Add</button>\r\n</mat-dialog-actions>\r\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/deck-home/deck-home.component.html":
  /*!******************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/deck-home/deck-home.component.html ***!
    \******************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppDeckHomeDeckHomeComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<!--<div class=\"container\">-->\r\n<!--  <div class=\"row justify-content-center\">-->\r\n<!--    <div class=\"col-8\">-->\r\n\r\n<!--      <button mat-raised-button color=\"warn\">back</button>-->\r\n<!--      <hr>-->\r\n<!--      <h1>Decks</h1>-->\r\n<!--      <hr>-->\r\n\r\n<!--      <div>-->\r\n<!--        <button mat-raised-button (click)=\"showAddDialog()\">+ add deck</button>-->\r\n<!--      </div>-->\r\n\r\n<!--      <div>-->\r\n<!--        <div *ngFor=\"let deck of decks\">-->\r\n<!--          <div>-->\r\n<!--            {{deck.title}}-->\r\n<!--            <div class=\"deck-outer-div\">-->\r\n\r\n<!--              <mat-grid-list cols=\"7\">-->\r\n<!--                <mat-grid-tile *ngIf=\"cardExists(deck.id,1)\">{{getCardText(deck.id, 1)}}</mat-grid-tile>-->\r\n<!--                <mat-grid-tile *ngIf=\"cardExists(deck.id,2)\">{{getCardText(deck.id, 2)}}</mat-grid-tile>-->\r\n<!--                <mat-grid-tile *ngIf=\"cardExists(deck.id,3)\">{{getCardText(deck.id, 3)}}</mat-grid-tile>-->\r\n<!--                <mat-grid-tile *ngIf=\"cardExists(deck.id,4)\">{{getCardText(deck.id, 4)}}</mat-grid-tile>-->\r\n<!--                <mat-grid-tile *ngIf=\"cardExists(deck.id,5)\">{{getCardText(deck.id, 5)}}</mat-grid-tile>-->\r\n<!--                <mat-grid-tile *ngIf=\"cardExists(deck.id,6)\">{{getCardText(deck.id, 6)}}</mat-grid-tile>-->\r\n\r\n<!--                <mat-grid-tile class=\"camouflage-background\">-->\r\n<!--                  <button mat-raised-button (click)=\"openDeck(deck.id)\" >-->\r\n\r\n<!--                    <a>view full</a>-->\r\n<!--                  </button>-->\r\n<!--                </mat-grid-tile>-->\r\n\r\n<!--              </mat-grid-list>-->\r\n<!--            </div>-->\r\n<!--          </div>-->\r\n<!--        </div>-->\r\n<!--      </div>-->\r\n<!--    </div>-->\r\n\r\n\r\n<!--  </div>-->\r\n\r\n<!--</div>-->\r\n\r\n<!--&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->\r\n\r\n<!--<ul>-->\r\n<!--  <li *ngFor=\"let deck of decks\">{{deck.id}} | {{deck.title}} | {{deck.description}} | {{deck.visibility}} | <button (click)=\"deleteDeck(deck.id)\">Delete</button></li>-->\r\n<!--</ul>-->\r\n\r\n<!--<button (click)=\"getDecks()\">Load</button>-->\r\n\r\n<!--<div>-->\r\n<!--  <label>-->\r\n<!--    id: <input type=\"number\" [ngModel]=\"deck.id\" (ngModelChange)=\"deck.id=$event\">-->\r\n<!--  </label>-->\r\n<!--  <br>-->\r\n\r\n<!--  <label>-->\r\n<!--    title: <input type=\"text\" [ngModel]=\"deck.title\" (ngModelChange)=\"deck.title=$event\">-->\r\n<!--  </label>-->\r\n<!--  <br>-->\r\n\r\n<!--  <label>-->\r\n<!--    description: <input type=\"text\" [ngModel]=\"deck.description\" (ngModelChange)=\"deck.description=$event\">-->\r\n<!--  </label>-->\r\n<!--  <br>-->\r\n\r\n<!--  <label>-->\r\n<!--    visibility: <input type=\"checkbox\" [ngModel]=\"deck.visibility\" (ngModelChange)=\"deck.visibility=$event\">-->\r\n<!--  </label>-->\r\n<!--  <br>-->\r\n\r\n<!--  <label>-->\r\n<!--    authorUserId: <input type=\"text\" [ngModel]=\"deck.authorUserId\" (ngModelChange)=\"deck.description=$event\">-->\r\n<!--  </label>-->\r\n<!--  <br>-->\r\n\r\n<!--  <button (click)=\"postDeck()\" mat-raised-button color=\"primary\">Add new Deck</button>-->\r\n<!--  <br>-->\r\n\r\n<!--  <button (click)=\"putDeck()\">Update Deck</button>-->\r\n<!--  <br>-->\r\n\r\n<!--</div>-->\r\n\r\n<body style=\"height: max-content; background-size: cover; background: #1A1A1A;\">\r\n<div class=\"container\" style=\"background-color: #1A1A1A\">\r\n  <div class=\"row justify-content-center\" style=\"background-color: #1F1F1F\">\r\n    <div class=\"col-8\" style=\"background-color: #1F1F1F\">\r\n\r\n      <button mat-raised-button style=\"background-color: #111111; color: #E8E9F3\">back</button>\r\n      <hr style=\"background-color: #E7E7E7\">\r\n      <h1 style=\"color: #E8E9F3\">Decks</h1>\r\n      <hr style=\"background-color: #E7E7E7\">\r\n\r\n      <div>\r\n        <!--<button mat-raised-button (click)=\"showAddDialog()\">+ add deck</button>-->\r\n        <div style=\"background-color: #AAAAAA;\" class=\"div-button\" (click)=\"showAddDialog()\">\r\n          <!--Рисовашки крестиков-->\r\n          <!--Векторная графика-->\r\n          <div class=\"button-add mat-raised-button\">\r\n            <svg class=\"button-add-plus-symbol\" viewBox=\"0 0 8 8\">\r\n              <line x1=\"1\" y1=\"4\" x2=\"7\" y2=4></line>\r\n              <line x1=\"4\" y1=\"1\" x2=\"4\" y2=7></line>\r\n            </svg>\r\n            <p>Add deck</p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div>\r\n        <div *ngFor=\"let deck of decks\" class=\"div-button\">\r\n          <!--{{deck.title}} | {{deck.description}} | {{deck.authorUserId}} | <button mat-raised-button (click)=\"openDeck(deck.id)\"> view full</button>-->\r\n          <div (click)=\"openDeck(deck.id)\">\r\n            <div class=\"mat-raised-button div-button-raise-fix\">\r\n              <div class=\"deck-header\">\r\n                <div class=\"div-button-unclickable-text\">{{deck.title}}</div>\r\n\r\n                <div>\r\n                  <a style=\"text-decoration: underline\">#{{deck.authorUser}}</a>\r\n                  <!--                  <a style=\"text-decoration: underline\">#{{getAuthorUsername(deck.authorUserId)}}</a>-->\r\n                  <!--                  <a style=\"text-decoration: underline\">#{{deck.id}}</a>-->\r\n                </div>\r\n              </div>\r\n\r\n              <hr style=\"margin-left: 1%; margin-right: 1%; background-color: #A1A1A1\">\r\n\r\n              <div style=\"padding-left: 1%; padding-right: 1%; padding-bottom: 1%;\">\r\n                <p style=\"text-align: start\"\r\n                   class=\"div-button-unclickable-text\">{{deck.description}}</p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n</body>\r\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/project-home/project-home.component.html":
  /*!************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/project-home/project-home.component.html ***!
    \************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppProjectHomeProjectHomeComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<p>project-home works!</p>\r\n";
    /***/
  },

  /***/
  "./src/$$_lazy_route_resource lazy recursive":
  /*!**********************************************************!*\
    !*** ./src/$$_lazy_route_resource lazy namespace object ***!
    \**********************************************************/

  /*! no static exports found */

  /***/
  function src$$_lazy_route_resourceLazyRecursive(module, exports) {
    function webpackEmptyAsyncContext(req) {
      // Here Promise.resolve().then() is used instead of new Promise() to prevent
      // uncaught exception popping up in devtools
      return Promise.resolve().then(function () {
        var e = new Error("Cannot find module '" + req + "'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      });
    }

    webpackEmptyAsyncContext.keys = function () {
      return [];
    };

    webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
    module.exports = webpackEmptyAsyncContext;
    webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
    /***/
  },

  /***/
  "./src/app/app.component.ts":
  /*!**********************************!*\
    !*** ./src/app/app.component.ts ***!
    \**********************************/

  /*! exports provided: AppComponent */

  /***/
  function srcAppAppComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
      return AppComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var __importDefault = undefined && undefined.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    var AppComponent = function AppComponent() {
      _classCallCheck(this, AppComponent);
    };

    AppComponent = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'app-root',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./app.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html"))["default"]
    })], AppComponent);
    /***/
  },

  /***/
  "./src/app/app.module.ts":
  /*!*******************************!*\
    !*** ./src/app/app.module.ts ***!
    \*******************************/

  /*! exports provided: AppModule */

  /***/
  function srcAppAppModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppModule", function () {
      return AppModule;
    });
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./app.component */
    "./src/app/app.component.ts");
    /* harmony import */


    var _deck_home_deck_home_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./deck-home/deck-home.component */
    "./src/app/deck-home/deck-home.component.ts");
    /* harmony import */


    var _deck_cards_home_deck_cards_home_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./deck-cards-home/deck-cards-home.component */
    "./src/app/deck-cards-home/deck-cards-home.component.ts");
    /* harmony import */


    var _project_home_project_home_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ./project-home/project-home.component */
    "./src/app/project-home/project-home.component.ts");
    /* harmony import */


    var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @angular/platform-browser/animations */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
    /* harmony import */


    var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! @angular/material/button */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
    /* harmony import */


    var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! @angular/material/grid-list */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/grid-list.js");
    /* harmony import */


    var _angular_material_card__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! @angular/material/card */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/card.js");
    /* harmony import */


    var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! @angular/material/dialog */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var __importDefault = undefined && undefined.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    var appRoutes = [{
      path: '',
      component: _project_home_project_home_component__WEBPACK_IMPORTED_MODULE_8__["ProjectHomeComponent"]
    }, {
      path: 'deck',
      component: _deck_home_deck_home_component__WEBPACK_IMPORTED_MODULE_6__["DeckHomeComponent"]
    }, {
      path: 'deckcards',
      component: _deck_cards_home_deck_cards_home_component__WEBPACK_IMPORTED_MODULE_7__["DeckCardsHomeComponent"]
    }];

    var AppModule = function AppModule() {
      _classCallCheck(this, AppModule);
    };

    AppModule = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"], _deck_home_deck_home_component__WEBPACK_IMPORTED_MODULE_6__["DeckHomeComponent"], _project_home_project_home_component__WEBPACK_IMPORTED_MODULE_8__["ProjectHomeComponent"], _deck_home_deck_home_component__WEBPACK_IMPORTED_MODULE_6__["AddDeckDialog"], _deck_cards_home_deck_cards_home_component__WEBPACK_IMPORTED_MODULE_7__["AddCardDialog"], _deck_cards_home_deck_cards_home_component__WEBPACK_IMPORTED_MODULE_7__["DeleteDialog"], _deck_cards_home_deck_cards_home_component__WEBPACK_IMPORTED_MODULE_7__["EditCardDialog"], _deck_cards_home_deck_cards_home_component__WEBPACK_IMPORTED_MODULE_7__["DeckCardsHomeComponent"]],
      imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"].withServerTransition({
        appId: 'ng-cli-universal'
      }), _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forRoot(appRoutes), _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__["BrowserAnimationsModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_11__["MatGridListModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_12__["MatCardModule"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__["MatDialogModule"]],
      providers: [],
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
    })], AppModule);
    /***/
  },

  /***/
  "./src/app/deck-cards-home/deck-cards-home.component.css":
  /*!***************************************************************!*\
    !*** ./src/app/deck-cards-home/deck-cards-home.component.css ***!
    \***************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppDeckCardsHomeDeckCardsHomeComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "mat-grid-tile {\r\n  background: #add8e6;\r\n}\r\n\r\nmat-card {\r\n  background: #f1f1f1;\r\n  margin-top: 2rem;\r\n}\r\n\r\nmat-grid-list {\r\n  background: aliceblue;\r\n}\r\n\r\n.deck-outer-div {\r\n  max-width: 40rem;\r\n  background: aliceblue;\r\n}\r\n\r\n.cardText {\r\n  display: inline-block;;\r\n}\r\n\r\n#deck-title {\r\n  margin-top: -1.2rem;\r\n}\r\n\r\n#deck-description {\r\n  margin-top: -1.2rem;\r\n}\r\n\r\n.text-wrapper {\r\n  min-width: 30%;\r\n  border-radius: 5px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGVjay1jYXJkcy1ob21lL2RlY2stY2FyZHMtaG9tZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxjQUFjO0VBQ2Qsa0JBQWtCO0FBQ3BCIiwiZmlsZSI6InNyYy9hcHAvZGVjay1jYXJkcy1ob21lL2RlY2stY2FyZHMtaG9tZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsibWF0LWdyaWQtdGlsZSB7XHJcbiAgYmFja2dyb3VuZDogI2FkZDhlNjtcclxufVxyXG5cclxubWF0LWNhcmQge1xyXG4gIGJhY2tncm91bmQ6ICNmMWYxZjE7XHJcbiAgbWFyZ2luLXRvcDogMnJlbTtcclxufVxyXG5cclxubWF0LWdyaWQtbGlzdCB7XHJcbiAgYmFja2dyb3VuZDogYWxpY2VibHVlO1xyXG59XHJcblxyXG4uZGVjay1vdXRlci1kaXYge1xyXG4gIG1heC13aWR0aDogNDByZW07XHJcbiAgYmFja2dyb3VuZDogYWxpY2VibHVlO1xyXG59XHJcblxyXG4uY2FyZFRleHQge1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jazs7XHJcbn1cclxuXHJcbiNkZWNrLXRpdGxlIHtcclxuICBtYXJnaW4tdG9wOiAtMS4ycmVtO1xyXG59XHJcblxyXG4jZGVjay1kZXNjcmlwdGlvbiB7XHJcbiAgbWFyZ2luLXRvcDogLTEuMnJlbTtcclxufVxyXG5cclxuLnRleHQtd3JhcHBlciB7XHJcbiAgbWluLXdpZHRoOiAzMCU7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG59XHJcbiJdfQ== */";
    /***/
  },

  /***/
  "./src/app/deck-cards-home/deck-cards-home.component.ts":
  /*!**************************************************************!*\
    !*** ./src/app/deck-cards-home/deck-cards-home.component.ts ***!
    \**************************************************************/

  /*! exports provided: DeckCardsHomeComponent, AddCardDialog, EditCardDialog, DeleteDialog */

  /***/
  function srcAppDeckCardsHomeDeckCardsHomeComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DeckCardsHomeComponent", function () {
      return DeckCardsHomeComponent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AddCardDialog", function () {
      return AddCardDialog;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EditCardDialog", function () {
      return EditCardDialog;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DeleteDialog", function () {
      return DeleteDialog;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/material/dialog */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var __metadata = undefined && undefined.__metadata || function (k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };

    var __param = undefined && undefined.__param || function (paramIndex, decorator) {
      return function (target, key) {
        decorator(target, key, paramIndex);
      };
    };

    var __importDefault = undefined && undefined.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    var DeckCardsHomeComponent = /*#__PURE__*/function () {
      function DeckCardsHomeComponent(http, route, dialog) {
        var _this = this;

        _classCallCheck(this, DeckCardsHomeComponent);

        this.http = http;
        this.route = route;
        this.dialog = dialog;
        this.cards = [];
        this.currentCards = [];
        this.decksCards = [];
        this.querySubscription = route.queryParams.subscribe(function (queryParam) {
          _this.deckId = queryParam['deckId'];
        });
      }

      _createClass(DeckCardsHomeComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.getCards();
          this.getDecksCards();
          this.getCurrentDeck();
          this.cardSide = "front";
        }
      }, {
        key: "showAddDialog",
        value: function showAddDialog() {
          var _this2 = this;

          this.clearCard();
          var dialogRef = this.dialog.open(AddCardDialog, {
            data: this.card
          });
          dialogRef.afterClosed().subscribe(function (result) {
            if (result != "") {
              _this2.card = result;

              _this2.postCard();
            }
          });
        }
      }, {
        key: "showEditCardDialog",
        value: function showEditCardDialog(editedCard) {
          var _this3 = this;

          this.clearCard();
          this.card.id = editedCard.id;
          this.card.color = editedCard.color;
          this.card.frontImage = editedCard.frontImage;
          this.card.backImage = editedCard.backImage;
          this.card.frontText = editedCard.frontText;
          this.card.backText = editedCard.backText;
          var dialogRef = this.dialog.open(EditCardDialog, {
            data: this.card
          });
          dialogRef.afterClosed().subscribe(function (result) {
            if (result != "") {
              _this3.card = result;
              editedCard.id = _this3.card.id;
              editedCard.color = _this3.card.color;
              editedCard.frontImage = _this3.card.frontImage;
              editedCard.backImage = _this3.card.backImage;
              editedCard.frontText = _this3.card.frontText;
              editedCard.backText = _this3.card.backText;

              _this3.putCard();
            }
          });
        }
      }, {
        key: "showDeleteCardDialog",
        value: function showDeleteCardDialog(cardId) {
          var _this4 = this;

          var dialogRef = this.dialog.open(DeleteDialog);
          dialogRef.afterClosed().subscribe(function (result) {
            if (result == true) {
              _this4.deleteCard(cardId);
            }
          });
        }
      }, {
        key: "showDeleteDeckDialog",
        value: function showDeleteDeckDialog() {
          var _this5 = this;

          var dialogRef = this.dialog.open(DeleteDialog);
          dialogRef.afterClosed().subscribe(function (result) {
            if (result == true) {
              _this5.deleteDeck();
            }
          });
        }
      }, {
        key: "clearCard",
        value: function clearCard() {
          this.card = {
            id: 0,
            backText: "",
            frontText: "",
            backImage: "",
            color: "",
            frontImage: ""
          };
        }
      }, {
        key: "getCards",
        value: function getCards() {
          var _this6 = this;

          this.http.get("https://localhost:5001/api/cards").subscribe(function (responseData) {
            _this6.cards = responseData;

            _this6.setCards();
          }, function (error) {
            alert("error: ".concat(error.status, ", ").concat(error.statusText));
          });
        }
      }, {
        key: "postCard",
        value: function postCard() {
          var _this7 = this;

          var body = JSON.stringify(this.card);
          var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json');
          this.http.post("https://localhost:5001/api/cards", body, {
            headers: headers
          }).subscribe(function (responseData) {
            _this7.cards.push(responseData);

            _this7.currentCards.push(responseData);

            _this7.postDeckCard(responseData.id);

            _this7.clearCard();
          }, function (error) {
            alert("error: ".concat(error.status, ", ").concat(error.statusText));
          });
        }
      }, {
        key: "putCard",
        value: function putCard() {
          var _this8 = this;

          var body = JSON.stringify(this.card); //     console.log(body);
          // console.log(this.cards);

          var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json');
          this.http.put("https://localhost:5001/api/cards/".concat(this.card.id), body, {
            headers: headers
          }).subscribe(function (responseData) {
            var findIndex = _this8.cards.findIndex(function (item) {
              return item.id == responseData.id;
            });

            _this8.cards.splice(findIndex, 1, responseData);

            _this8.clearCard();
          }, function (error) {
            alert("error: ".concat(error.status, ", ").concat(error.statusText));
          });
        }
      }, {
        key: "deleteDeck",
        value: function deleteDeck() {
          this.http["delete"]("https://localhost:5001/api/decks/".concat(this.currentDeck.id)).subscribe(function (responseData) {
            location.href = 'deck';
          }, function (error) {
            alert("error: ".concat(error.status, ", ").concat(error.statusText));
          });
        }
      }, {
        key: "deleteCard",
        value: function deleteCard(cardId) {
          var _this9 = this;

          this.http["delete"]("https://localhost:5001/api/cards/".concat(cardId)).subscribe(function (responseData) {
            var findIndex = _this9.cards.findIndex(function (item) {
              return item.id == responseData;
            });

            _this9.cards.splice(findIndex, 1);

            var findIndex2 = _this9.currentCards.findIndex(function (item) {
              return item.id == responseData;
            });

            _this9.currentCards.splice(findIndex2, 1);
          }, function (error) {
            alert("error: ".concat(error.status, ", ").concat(error.statusText));
          });
        }
      }, {
        key: "postDeckCard",
        value: function postDeckCard(cardId) {
          var _this10 = this;

          this.decksCard = {
            cardId: cardId,
            deckId: this.currentDeck.id
          };
          var body = JSON.stringify(this.decksCard);
          var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json');
          this.http.post("https://localhost:5001/api/deckscards", body, {
            headers: headers
          }).subscribe(function (responseData) {
            _this10.decksCards.push(responseData);
          }, function (error) {
            alert("error: ".concat(error.status, ", ").concat(error.statusText));
          });
        }
      }, {
        key: "getCurrentDeck",
        value: function getCurrentDeck() {
          var _this11 = this;

          this.http.get("https://localhost:5001/api/decks/".concat(this.deckId)).subscribe(function (responseData) {
            _this11.currentDeck = responseData;
          }, function (error) {
            alert("error: ".concat(error.status, ", ").concat(error.statusText));
          });
        }
      }, {
        key: "getDecksCards",
        value: function getDecksCards() {
          var _this12 = this;

          this.http.get("https://localhost:5001/api/deckscards").subscribe(function (responseData) {
            _this12.decksCards = responseData;

            _this12.setCards();
          }, function (error) {
            alert("error: ".concat(error.status, ", ").concat(error.statusText));
          });
        }
      }, {
        key: "changeCardSide",
        value: function changeCardSide() {
          if (this.cardSide == "front") {
            this.cardSide = "back";
          } else {
            this.cardSide = "front";
          }
        }
      }, {
        key: "goBack",
        value: function goBack() {
          location.href = 'deck';
        }
      }, {
        key: "setCards",
        value: function setCards() {
          var _this13 = this;

          if (this.decksCards.length != 0 && this.cards.length != 0) {
            var _loop = function _loop(i) {
              if (_this13.decksCards[i].deckId == _this13.deckId) {
                _this13.currentCards.push(_this13.cards.find(function (c) {
                  return c.id == _this13.decksCards[i].cardId;
                }));
              }
            };

            for (var i = 0; i < this.decksCards.length; i++) {
              _loop(i);
            }
          }
        }
      }]);

      return DeckCardsHomeComponent;
    }();

    DeckCardsHomeComponent.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
      }, {
        type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialog"]
      }];
    };

    DeckCardsHomeComponent = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'app-deck-cards-home',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./deck-cards-home.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/deck-cards-home/deck-cards-home.component.html"))["default"],
      styles: [__importDefault(__webpack_require__(
      /*! ./deck-cards-home.component.css */
      "./src/app/deck-cards-home/deck-cards-home.component.css"))["default"]]
    }), __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialog"]])], DeckCardsHomeComponent);

    var AddCardDialog = /*#__PURE__*/function () {
      function AddCardDialog(dialogRef, card) {
        _classCallCheck(this, AddCardDialog);

        this.dialogRef = dialogRef;
        this.card = card;
      }

      _createClass(AddCardDialog, [{
        key: "onNoClick",
        value: function onNoClick() {
          this.dialogRef.close();
        }
      }]);

      return AddCardDialog;
    }();

    AddCardDialog.ctorParameters = function () {
      return [{
        type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"]
      }, {
        type: undefined,
        decorators: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
          args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"]]
        }]
      }];
    };

    AddCardDialog = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'add-card-dialog',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./add-card-dialog.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/deck-cards-home/add-card-dialog.html"))["default"]
    }), __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])), __metadata("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], Object])], AddCardDialog);

    var EditCardDialog = /*#__PURE__*/function () {
      function EditCardDialog(dialogRef, editedCard) {
        _classCallCheck(this, EditCardDialog);

        this.dialogRef = dialogRef;
        this.editedCard = editedCard;
      }

      _createClass(EditCardDialog, [{
        key: "onNoClick",
        value: function onNoClick() {
          this.dialogRef.close();
        }
      }]);

      return EditCardDialog;
    }();

    EditCardDialog.ctorParameters = function () {
      return [{
        type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"]
      }, {
        type: undefined,
        decorators: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
          args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"]]
        }]
      }];
    };

    EditCardDialog = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'edit-card-dialog',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./edit-card-dialog.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/deck-cards-home/edit-card-dialog.html"))["default"]
    }), __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])), __metadata("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], Object])], EditCardDialog);

    var DeleteDialog = /*#__PURE__*/function () {
      function DeleteDialog(dialogRef) {
        _classCallCheck(this, DeleteDialog);

        this.dialogRef = dialogRef;
      }

      _createClass(DeleteDialog, [{
        key: "onNoClick",
        value: function onNoClick() {
          this.dialogRef.close();
        }
      }]);

      return DeleteDialog;
    }();

    DeleteDialog.ctorParameters = function () {
      return [{
        type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"]
      }];
    };

    DeleteDialog = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'delete-dialog',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./delete-dialog.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/deck-cards-home/delete-dialog.html"))["default"]
    }), __metadata("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"]])], DeleteDialog);
    /***/
  },

  /***/
  "./src/app/deck-home/deck-home.component.css":
  /*!***************************************************!*\
    !*** ./src/app/deck-home/deck-home.component.css ***!
    \***************************************************/

  /*! exports provided: default */

  /***/
  function srcAppDeckHomeDeckHomeComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "mat-grid-tile {\r\n  background: lightblue;\r\n}\r\n\r\n.camouflage-background {\r\n  background: aliceblue;\r\n}\r\n\r\n.deck-outer-div {\r\n  max-width: 40rem;\r\n  background: aliceblue;\r\n}\r\n\r\n.inner {\r\n  height: 10%;\r\n  padding: 1rem;\r\n}\r\n\r\n.div-button {\r\n  border-radius: 5px;\r\n  cursor: pointer;\r\n}\r\n\r\n.div-button-unclickable-text{\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  -o-user-select: none;\r\n  user-select: none;\r\n}\r\n\r\n.div-button-raise-fix{\r\n  display: block;\r\n  background-color: #CACACF;\r\n}\r\n\r\n.button-add {\r\n  display: flex;\r\n  flex-flow: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n\r\n  background-color: #DADADF;\r\n  color: #AFAFAF;\r\n}\r\n\r\n.button-add-plus-symbol {\r\n  width: 60px;\r\n  height: 60px;\r\n  stroke-width: 2; /*ширина линии*/\r\n\r\n  padding: 2%;\r\n\r\n  stroke: #AFAFAF; /*цвет линии через rgb*/\r\n  stroke-linecap: round; /*тип линии*/\r\n}\r\n\r\n.deck-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding-top: 1%;\r\n  padding-bottom: 1%;\r\n  margin: 1%;\r\n\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGVjay1ob21lL2RlY2staG9tZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUV6QixzQkFBc0I7RUFDdEIscUJBQXFCO0VBQ3JCLG9CQUFvQjtFQUNwQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGlCQUFpQjtFQUNqQix1QkFBdUI7RUFDdkIsbUJBQW1COztFQUVuQix5QkFBeUI7RUFDekIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osZUFBZSxFQUFFLGVBQWU7O0VBRWhDLFdBQVc7O0VBRVgsZUFBZSxFQUFFLHVCQUF1QjtFQUN4QyxxQkFBcUIsRUFBRSxZQUFZO0FBQ3JDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixVQUFVOztBQUVaIiwiZmlsZSI6InNyYy9hcHAvZGVjay1ob21lL2RlY2staG9tZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsibWF0LWdyaWQtdGlsZSB7XHJcbiAgYmFja2dyb3VuZDogbGlnaHRibHVlO1xyXG59XHJcblxyXG4uY2Ftb3VmbGFnZS1iYWNrZ3JvdW5kIHtcclxuICBiYWNrZ3JvdW5kOiBhbGljZWJsdWU7XHJcbn1cclxuXHJcbi5kZWNrLW91dGVyLWRpdiB7XHJcbiAgbWF4LXdpZHRoOiA0MHJlbTtcclxuICBiYWNrZ3JvdW5kOiBhbGljZWJsdWU7XHJcbn1cclxuXHJcbi5pbm5lciB7XHJcbiAgaGVpZ2h0OiAxMCU7XHJcbiAgcGFkZGluZzogMXJlbTtcclxufVxyXG5cclxuLmRpdi1idXR0b24ge1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5kaXYtYnV0dG9uLXVuY2xpY2thYmxlLXRleHR7XHJcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcclxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgLW8tdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XHJcbn1cclxuXHJcbi5kaXYtYnV0dG9uLXJhaXNlLWZpeHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQ0FDQUNGO1xyXG59XHJcblxyXG4uYnV0dG9uLWFkZCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWZsb3c6IGNvbHVtbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjREFEQURGO1xyXG4gIGNvbG9yOiAjQUZBRkFGO1xyXG59XHJcblxyXG4uYnV0dG9uLWFkZC1wbHVzLXN5bWJvbCB7XHJcbiAgd2lkdGg6IDYwcHg7XHJcbiAgaGVpZ2h0OiA2MHB4O1xyXG4gIHN0cm9rZS13aWR0aDogMjsgLyrRiNC40YDQuNC90LAg0LvQuNC90LjQuCovXHJcblxyXG4gIHBhZGRpbmc6IDIlO1xyXG5cclxuICBzdHJva2U6ICNBRkFGQUY7IC8q0YbQstC10YIg0LvQuNC90LjQuCDRh9C10YDQtdC3IHJnYiovXHJcbiAgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kOyAvKtGC0LjQvyDQu9C40L3QuNC4Ki9cclxufVxyXG5cclxuLmRlY2staGVhZGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHBhZGRpbmctdG9wOiAxJTtcclxuICBwYWRkaW5nLWJvdHRvbTogMSU7XHJcbiAgbWFyZ2luOiAxJTtcclxuXHJcbn1cclxuIl19 */";
    /***/
  },

  /***/
  "./src/app/deck-home/deck-home.component.ts":
  /*!**************************************************!*\
    !*** ./src/app/deck-home/deck-home.component.ts ***!
    \**************************************************/

  /*! exports provided: DeckHomeComponent, AddDeckDialog */

  /***/
  function srcAppDeckHomeDeckHomeComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DeckHomeComponent", function () {
      return DeckHomeComponent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AddDeckDialog", function () {
      return AddDeckDialog;
    });
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/material/dialog */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var __metadata = undefined && undefined.__metadata || function (k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };

    var __param = undefined && undefined.__param || function (paramIndex, decorator) {
      return function (target, key) {
        decorator(target, key, paramIndex);
      };
    };

    var __importDefault = undefined && undefined.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    var DeckHomeComponent = /*#__PURE__*/function () {
      function DeckHomeComponent(http, dialog) {
        _classCallCheck(this, DeckHomeComponent);

        this.http = http;
        this.dialog = dialog;
        this.decks = [];
        this.cards = [];
        this.decksCards = [];
        this.deck = {
          id: 0,
          visibility: false,
          description: '',
          title: '',
          authorUserId: 1,
          authorUser: ''
        };
        this.username = "";
      }

      _createClass(DeckHomeComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.getDecks();
          this.getCards();
          this.getDecksCards();
        }
      }, {
        key: "test",
        value: function test() {
          console.log(this.cards);
        }
      }, {
        key: "log",
        value: function log(id) {
          console.log(id);
        }
      }, {
        key: "openDeck",
        value: function openDeck(deckId) {
          location.href = 'deckcards?deckId=' + deckId;
        }
      }, {
        key: "showAddDialog",
        value: function showAddDialog() {
          var _this14 = this;

          this.clearDeck();
          var dialogRef = this.dialog.open(AddDeckDialog, {
            data: this.deck
          });
          dialogRef.afterClosed().subscribe(function (result) {
            if (result != "") {
              _this14.deck = result;

              _this14.postDeck();
            }
          });
        }
      }, {
        key: "cardExists",
        value: function cardExists(deckId, cardNumber) {
          var count = this.getDeckCardsCount(deckId);
          return cardNumber <= count;
        }
      }, {
        key: "getDeckCardsCount",
        value: function getDeckCardsCount(deckId) {
          var count = 0;

          for (var i = 0; i < this.decksCards.length; i++) {
            if (this.decksCards[i].deckId == deckId) {
              count++;
            }
          }

          return count;
        }
      }, {
        key: "getCardText",
        value: function getCardText(deckId, cardNumber) {
          var realId = this.decksCards.filter(function (c) {
            return c.deckId == deckId;
          })[cardNumber - 1].cardId;
          return this.cards.find(function (c) {
            return c.id == realId;
          }).frontText;
        }
      }, {
        key: "clearDeck",
        value: function clearDeck() {
          this.deck = {
            id: 0,
            visibility: false,
            description: '',
            title: '',
            authorUserId: 1,
            authorUser: ''
          };
        }
      }, {
        key: "getCards",
        value: function getCards() {
          var _this15 = this;

          this.http.get("https://localhost:5001/api/cards").subscribe(function (responseData) {
            _this15.cards = responseData;
          }, function (error) {
            alert("error: ".concat(error.status, ", ").concat(error.statusText));
          });
        }
      }, {
        key: "getDecksCards",
        value: function getDecksCards() {
          var _this16 = this;

          this.http.get("https://localhost:5001/api/deckscards").subscribe(function (responseData) {
            _this16.decksCards = responseData;
          }, function (error) {
            alert("error: ".concat(error.status, ", ").concat(error.statusText));
          });
        } //======DECKS START======//

      }, {
        key: "getDecks",
        value: function getDecks() {
          var _this17 = this;

          this.http.get("https://localhost:5001/api/decks").subscribe(function (responseData) {
            _this17.decks = responseData;
            console.dir(_this17.decks[0]);
          }, function (error) {
            alert("error: ".concat(error.status, ", ").concat(error.statusText));
          });
        }
      }, {
        key: "deleteDeck",
        value: function deleteDeck(id) {
          var _this18 = this;

          this.http["delete"]("https://localhost:5001/api/decks/".concat(id)).subscribe(function (responseData) {
            var findIndex = _this18.decks.findIndex(function (item) {
              return item.id == responseData;
            });

            _this18.decks.splice(findIndex, 1);
          }, function (error) {
            alert("error: ".concat(error.status, ", ").concat(error.statusText));
          });
        }
      }, {
        key: "postDeck",
        value: function postDeck() {
          var _this19 = this;

          var body = JSON.stringify(this.deck);
          var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]().set('Content-Type', 'application/json');
          this.http.post("https://localhost:5001/api/decks", body, {
            headers: headers
          }).subscribe(function (responseData) {
            _this19.decks.push(responseData);

            _this19.clearDeck();
          }, function (error) {
            alert("error: ".concat(error.status, ", ").concat(error.statusText));
          });
        }
      }, {
        key: "putDeck",
        value: function putDeck() {
          var _this20 = this;

          var body = JSON.stringify(this.deck);
          var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]().set('Content-Type', 'application/json');
          this.http.put("https://localhost:5001/api/decks/".concat(this.deck.id), body, {
            headers: headers
          }).subscribe(function (responseData) {
            var findIndex = _this20.decks.findIndex(function (item) {
              return item.id == responseData.id;
            });

            _this20.decks.splice(findIndex, 1, responseData);

            _this20.clearDeck();
          }, function (error) {
            alert("error: ".concat(error.status, ", ").concat(error.statusText));
          });
        } //======DECKS FINISH======//

      }, {
        key: "getUser",
        value: function getUser(id) {
          var _this21 = this;

          this.http.get("https://localhost:5001/api/users/".concat(id)).subscribe(function (responseData) {
            _this21.username = responseData.username;
          }, function (error) {
            alert("error: ".concat(error.status, ", ").concat(error.statusText));
          });
        }
      }, {
        key: "getAuthorUsername",
        value: function getAuthorUsername(id) {
          this.getUser(id);
          return this.username;
        }
      }]);

      return DeckHomeComponent;
    }();

    DeckHomeComponent.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]
      }, {
        type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]
      }];
    };

    DeckHomeComponent = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-deck-home',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./deck-home.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/deck-home/deck-home.component.html"))["default"],
      styles: [__importDefault(__webpack_require__(
      /*! ./deck-home.component.css */
      "./src/app/deck-home/deck-home.component.css"))["default"]]
    }), __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])], DeckHomeComponent);

    var AddDeckDialog = /*#__PURE__*/function () {
      function AddDeckDialog(dialogRef, deck) {
        _classCallCheck(this, AddDeckDialog);

        this.dialogRef = dialogRef;
        this.deck = deck;
      }

      _createClass(AddDeckDialog, [{
        key: "onNoClick",
        value: function onNoClick() {
          this.dialogRef.close();
        }
      }]);

      return AddDeckDialog;
    }();

    AddDeckDialog.ctorParameters = function () {
      return [{
        type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]
      }, {
        type: undefined,
        decorators: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
          args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"]]
        }]
      }];
    };

    AddDeckDialog = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'add-deck-dialog',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./add-deck-dialog.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/deck-home/add-deck-dialog.html"))["default"]
    }), __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])), __metadata("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])], AddDeckDialog);
    /***/
  },

  /***/
  "./src/app/project-home/project-home.component.css":
  /*!*********************************************************!*\
    !*** ./src/app/project-home/project-home.component.css ***!
    \*********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppProjectHomeProjectHomeComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Byb2plY3QtaG9tZS9wcm9qZWN0LWhvbWUuY29tcG9uZW50LmNzcyJ9 */";
    /***/
  },

  /***/
  "./src/app/project-home/project-home.component.ts":
  /*!********************************************************!*\
    !*** ./src/app/project-home/project-home.component.ts ***!
    \********************************************************/

  /*! exports provided: ProjectHomeComponent */

  /***/
  function srcAppProjectHomeProjectHomeComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ProjectHomeComponent", function () {
      return ProjectHomeComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var __metadata = undefined && undefined.__metadata || function (k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };

    var __importDefault = undefined && undefined.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    var ProjectHomeComponent = /*#__PURE__*/function () {
      function ProjectHomeComponent() {
        _classCallCheck(this, ProjectHomeComponent);
      }

      _createClass(ProjectHomeComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return ProjectHomeComponent;
    }();

    ProjectHomeComponent = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'app-project-home',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./project-home.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/project-home/project-home.component.html"))["default"],
      styles: [__importDefault(__webpack_require__(
      /*! ./project-home.component.css */
      "./src/app/project-home/project-home.component.css"))["default"]]
    }), __metadata("design:paramtypes", [])], ProjectHomeComponent);
    /***/
  },

  /***/
  "./src/environments/environment.ts":
  /*!*****************************************!*\
    !*** ./src/environments/environment.ts ***!
    \*****************************************/

  /*! exports provided: environment */

  /***/
  function srcEnvironmentsEnvironmentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "environment", function () {
      return environment;
    }); // This file can be replaced during build by using the `fileReplacements` array.
    // `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
    // The list of file replacements can be found in `angular.json`.


    var __importDefault = undefined && undefined.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    var environment = {
      production: false
    };
    /*
     * In development mode, to ignore zone related error stack frames such as
     * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
     * import the following file, but please comment it out in production mode
     * because it will have performance impact when throw error
     */
    // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

    /***/
  },

  /***/
  "./src/main.ts":
  /*!*********************!*\
    !*** ./src/main.ts ***!
    \*********************/

  /*! exports provided: getBaseUrl */

  /***/
  function srcMainTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getBaseUrl", function () {
      return getBaseUrl;
    });
    /* harmony import */


    var _angular_localize_init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/localize/init */
    "./node_modules/@angular/localize/fesm2015/init.js");
    /* harmony import */


    var _angular_localize_init__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_angular_localize_init__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/platform-browser-dynamic */
    "./node_modules/@angular/platform-browser-dynamic/__ivy_ngcc__/fesm2015/platform-browser-dynamic.js");
    /* harmony import */


    var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./app/app.module */
    "./src/app/app.module.ts");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./environments/environment */
    "./src/environments/environment.ts");

    var __importDefault = undefined && undefined.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };
    /***************************************************************************************************
     * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
     */


    function getBaseUrl() {
      return document.getElementsByTagName('base')[0].href;
    }

    var providers = [{
      provide: 'BASE_URL',
      useFactory: getBaseUrl,
      deps: []
    }];

    if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
      Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
    }

    Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])(providers).bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])["catch"](function (err) {
      return console.log(err);
    });
    /***/
  },

  /***/
  0:
  /*!***************************!*\
    !*** multi ./src/main.ts ***!
    \***************************/

  /*! no static exports found */

  /***/
  function _(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(
    /*! D:\projects\MemoryCardsWebApp\MemoryCardsWebApp\ClientApp\src\main.ts */
    "./src/main.ts");
    /***/
  }
}, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main-es5.js.map