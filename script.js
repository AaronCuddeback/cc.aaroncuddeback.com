(function () {
  var a =
    [].indexOf ||
    function (a) {
      for (var b = 0, c = this.length; c > b; b++)
        if (b in this && this[b] === a) return b;
      return -1;
    };
  !(function (a, b) {
    return "undefined" != typeof module && null !== module
      ? (module.exports = b())
      : "function" == typeof define && "object" == typeof define.amd
      ? define(a, b)
      : (this[a] = b());
  })("payform", function () {
    var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x;
    return (
      (c = function (a) {
        var b, c, d;
        return null != a.selectionStart
          ? a.selectionStart
          : null != document.selection
          ? (a.focus(),
            (b = document.selection.createRange()),
            (d = a.createTextRange()),
            (c = d.duplicate()),
            d.moveToBookmark(b.getBookmark()),
            c.setEndPoint("EndToStart", d),
            c.text.length)
          : void 0;
      }),
      (b = function (a) {
        return function (b) {
          return (
            null == b && (b = window.event),
            (b.target = b.target || b.srcElement),
            (b.which = b.which || b.keyCode),
            null == b.preventDefault &&
              (b.preventDefault = function () {
                return (this.returnValue = !1);
              }),
            a(b)
          );
        };
      }),
      (d = function (a, c, d) {
        return (
          (d = b(d)),
          null != a.addEventListener
            ? a.addEventListener(c, d, !1)
            : a.attachEvent("on" + c, d)
        );
      }),
      (p = {}),
      (g = /(\d{1,4})/g),
      (p.cards = [
        {
          type: "visaelectron",
          pattern: /^4(026|17500|405|508|844|91[37])/,
          format: g,
          length: [16],
          cvcLength: [3],
          luhn: !0,
        },
        {
          type: "visa",
          pattern: /^4/,
          format: g,
          length: [13, 16],
          cvcLength: [3],
          luhn: !0,
        },
        {
          type: "mastercard",
          pattern: /^(5[1-5]|2[2-7])/,
          format: g,
          length: [16],
          cvcLength: [3],
          luhn: !0,
        },
        {
          type: "amex",
          pattern: /^3[47]/,
          format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
          length: [15],
          cvcLength: [3, 4],
          luhn: !0,
        },
        {
          type: "dinersclub",
          pattern: /^3[0689]/,
          format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
          length: [14],
          cvcLength: [3],
          luhn: !0,
        },
        {
          type: "discover",
          pattern: /^6([045]|22)/,
          format: g,
          length: [16],
          cvcLength: [3],
          luhn: !0,
        },
        {
          type: "unionpay",
          pattern: /^(62|88)/,
          format: g,
          length: [16, 17, 18, 19],
          cvcLength: [3],
          luhn: !1,
        },
        {
          type: "jcb",
          pattern: /^35/,
          format: g,
          length: [16],
          cvcLength: [3],
          luhn: !0,
        },
      ]),
      (e = function (a) {
        var b, c, d, e;
        for (
          a = (a + "").replace(/\D/g, ""), e = p.cards, c = 0, d = e.length;
          d > c;
          c++
        )
          if (((b = e[c]), b.pattern.test(a))) return b;
      }),
      (f = function (a) {
        var b, c, d, e;
        for (e = p.cards, c = 0, d = e.length; d > c; c++)
          if (((b = e[c]), b.type === a)) return b;
      }),
      (o = function (a) {
        var b, c, d, e, f, g;
        for (
          f = !0, g = 0, c = (a + "").split("").reverse(), d = 0, e = c.length;
          e > d;
          d++
        )
          (b = c[d]),
            (b = parseInt(b, 10)),
            (f = !f) && (b *= 2),
            b > 9 && (b -= 9),
            (g += b);
        return g % 10 === 0;
      }),
      (n = function (a) {
        var b;
        return null !=
          ("undefined" != typeof document &&
          null !== document &&
          null != (b = document.selection)
            ? b.createRange
            : void 0) && document.selection.createRange().text
          ? !0
          : null != a.selectionStart && a.selectionStart !== a.selectionEnd;
      }),
      (t = function (a) {
        var b, c, d, e, f, g, h, i;
        for (
          null == a && (a = ""),
            d = "０１２３４５６７８９",
            e = "0123456789",
            i = "",
            c = a.split(""),
            f = 0,
            h = c.length;
          h > f;
          f++
        )
          (b = c[f]), (g = d.indexOf(b)), g > -1 && (b = e[g]), (i += b);
        return i;
      }),
      (r = function (a) {
        var b;
        return (
          (b = c(a.target)),
          (a.target.value = p.formatCardNumber(a.target.value)),
          null != b && "change" !== a.type
            ? a.target.setSelectionRange(b, b)
            : void 0
        );
      }),
      (k = function (a) {
        var b, d, f, g, h, i, j;
        return (
          (f = String.fromCharCode(a.which)),
          !/^\d+$/.test(f) ||
          ((j = a.target.value),
          (b = e(j + f)),
          (g = (j.replace(/\D/g, "") + f).length),
          (i = 16),
          b && (i = b.length[b.length.length - 1]),
          g >= i || ((d = c(a.target)), d && d !== j.length))
            ? void 0
            : ((h =
                b && "amex" === b.type
                  ? /^(\d{4}|\d{4}\s\d{6})$/
                  : /(?:^|\s)(\d{4})$/),
              h.test(j)
                ? (a.preventDefault(),
                  setTimeout(function () {
                    return (a.target.value = j + " " + f);
                  }))
                : h.test(j + f)
                ? (a.preventDefault(),
                  setTimeout(function () {
                    return (a.target.value = j + f + " ");
                  }))
                : void 0)
        );
      }),
      (h = function (a) {
        var b, d;
        return (
          (d = a.target.value),
          8 !== a.which || ((b = c(a.target)), b && b !== d.length)
            ? void 0
            : /\d\s$/.test(d)
            ? (a.preventDefault(),
              setTimeout(function () {
                return (a.target.value = d.replace(/\d\s$/, ""));
              }))
            : /\s\d?$/.test(d)
            ? (a.preventDefault(),
              setTimeout(function () {
                return (a.target.value = d.replace(/\d$/, ""));
              }))
            : void 0
        );
      }),
      (s = function (a) {
        var b;
        return (
          (b = c(a.target)),
          (a.target.value = p.formatCardExpiry(a.target.value)),
          null != b && "change" !== a.type
            ? a.target.setSelectionRange(b, b)
            : void 0
        );
      }),
      (j = function (a) {
        var b, c;
        return (
          (b = String.fromCharCode(a.which)),
          /^\d+$/.test(b)
            ? ((c = a.target.value + b),
              /^\d$/.test(c) && "0" !== c && "1" !== c
                ? (a.preventDefault(),
                  setTimeout(function () {
                    return (a.target.value = "0" + c + " / ");
                  }))
                : /^\d\d$/.test(c)
                ? (a.preventDefault(),
                  setTimeout(function () {
                    return (a.target.value = c + " / ");
                  }))
                : void 0)
            : void 0
        );
      }),
      (l = function (a) {
        var b, c;
        return (
          (b = String.fromCharCode(a.which)),
          /^\d+$/.test(b)
            ? ((c = a.target.value),
              /^\d\d$/.test(c) ? (a.target.value = c + " / ") : void 0)
            : void 0
        );
      }),
      (m = function (a) {
        var b, c;
        return (
          (c = String.fromCharCode(a.which)),
          "/" === c || " " === c
            ? ((b = a.target.value),
              /^\d$/.test(b) && "0" !== b
                ? (a.target.value = "0" + b + " / ")
                : void 0)
            : void 0
        );
      }),
      (i = function (a) {
        var b, d;
        return (
          (d = a.target.value),
          8 !== a.which || ((b = c(a.target)), b && b !== d.length)
            ? void 0
            : /\d\s\/\s$/.test(d)
            ? (a.preventDefault(),
              setTimeout(function () {
                return (a.target.value = d.replace(/\d\s\/\s$/, ""));
              }))
            : void 0
        );
      }),
      (q = function (a) {
        var b;
        return (
          (b = c(a.target)),
          (a.target.value = t(a.target.value).replace(/\D/g, "").slice(0, 4)),
          null != b && "change" !== a.type
            ? a.target.setSelectionRange(b, b)
            : void 0
        );
      }),
      (x = function (a) {
        var b;
        if (!(a.metaKey || a.ctrlKey || 0 === a.which || a.which < 33))
          return (
            (b = String.fromCharCode(a.which)),
            /^\d+$/.test(b) ? void 0 : a.preventDefault()
          );
      }),
      (v = function (a) {
        var b, c, d;
        return (
          (c = String.fromCharCode(a.which)),
          /^\d+$/.test(c) && !n(a.target)
            ? ((d = (a.target.value + c).replace(/\D/g, "")),
              (b = e(d)),
              b && d.length > b.length[b.length.length - 1]
                ? a.preventDefault()
                : d.length > 16
                ? a.preventDefault()
                : void 0)
            : void 0
        );
      }),
      (w = function (a) {
        var b, c;
        return (
          (b = String.fromCharCode(a.which)),
          /^\d+$/.test(b) && !n(a.target)
            ? ((c = a.target.value + b),
              (c = c.replace(/\D/g, "")),
              c.length > 6 ? a.preventDefault() : void 0)
            : void 0
        );
      }),
      (u = function (a) {
        var b, c;
        return (
          (b = String.fromCharCode(a.which)),
          /^\d+$/.test(b) && !n(a.target)
            ? ((c = a.target.value + b),
              c.length > 4 ? a.preventDefault() : void 0)
            : void 0
        );
      }),
      (p.cvcInput = function (a) {
        return (
          d(a, "keypress", x),
          d(a, "keypress", u),
          d(a, "paste", q),
          d(a, "change", q),
          d(a, "input", q)
        );
      }),
      (p.expiryInput = function (a) {
        return (
          d(a, "keypress", x),
          d(a, "keypress", w),
          d(a, "keypress", j),
          d(a, "keypress", m),
          d(a, "keypress", l),
          d(a, "keydown", i),
          d(a, "change", s),
          d(a, "input", s)
        );
      }),
      (p.cardNumberInput = function (a) {
        return (
          d(a, "keypress", x),
          d(a, "keypress", v),
          d(a, "keypress", k),
          d(a, "keydown", h),
          d(a, "paste", r),
          d(a, "change", r),
          d(a, "input", r)
        );
      }),
      (p.numericInput = function (a) {
        return (
          d(a, "keypress", x),
          d(a, "paste", x),
          d(a, "change", x),
          d(a, "input", x)
        );
      }),
      (p.parseCardExpiry = function (a) {
        var b, c, d, e;
        return (
          (a = a.replace(/\s/g, "")),
          (d = a.split("/", 2)),
          (b = d[0]),
          (e = d[1]),
          2 === (null != e ? e.length : void 0) &&
            /^\d+$/.test(e) &&
            ((c = new Date().getFullYear()),
            (c = c.toString().slice(0, 2)),
            (e = c + e)),
          (b = parseInt(b, 10)),
          (e = parseInt(e, 10)),
          { month: b, year: e }
        );
      }),
      (p.validateCardNumber = function (b) {
        var c, d;
        return (
          (b = (b + "").replace(/\s+|-/g, "")),
          /^\d+$/.test(b)
            ? ((c = e(b)),
              c
                ? ((d = b.length),
                  a.call(c.length, d) >= 0 && (c.luhn === !1 || o(b)))
                : !1)
            : !1
        );
      }),
      (p.validateCardExpiry = function (a, b) {
        var c, d, e;
        return (
          "object" == typeof a &&
            "month" in a &&
            ((e = a), (a = e.month), (b = e.year)),
          a && b
            ? ((a = String(a).trim()),
              (b = String(b).trim()),
              /^\d+$/.test(a) && /^\d+$/.test(b) && a >= 1 && 12 >= a
                ? (2 === b.length && (b = 70 > b ? "20" + b : "19" + b),
                  4 !== b.length
                    ? !1
                    : ((d = new Date(b, a)),
                      (c = new Date()),
                      d.setMonth(d.getMonth() - 1),
                      d.setMonth(d.getMonth() + 1, 1),
                      d > c))
                : !1)
            : !1
        );
      }),
      (p.validateCardCVC = function (b, c) {
        var d, e;
        return (
          (b = String(b).trim()),
          /^\d+$/.test(b)
            ? ((d = f(c)),
              null != d
                ? ((e = b.length), a.call(d.cvcLength, e) >= 0)
                : b.length >= 3 && b.length <= 4)
            : !1
        );
      }),
      (p.parseCardType = function (a) {
        var b;
        return a ? (null != (b = e(a)) ? b.type : void 0) || null : null;
      }),
      (p.formatCardNumber = function (a) {
        var b, c, d, f;
        return (
          (a = t(a)),
          (a = a.replace(/\D/g, "")),
          (b = e(a))
            ? ((f = b.length[b.length.length - 1]),
              (a = a.slice(0, f)),
              b.format.global
                ? null != (d = a.match(b.format))
                  ? d.join(" ")
                  : void 0
                : ((c = b.format.exec(a)),
                  null != c
                    ? (c.shift(), (c = c.filter(Boolean)), c.join(" "))
                    : void 0))
            : a
        );
      }),
      (p.formatCardExpiry = function (a) {
        var b, c, d, e;
        return (
          (a = t(a)),
          (c = a.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/))
            ? ((b = c[1] || ""),
              (d = c[2] || ""),
              (e = c[3] || ""),
              e.length > 0
                ? (d = " / ")
                : " /" === d
                ? ((b = b.substring(0, 1)), (d = ""))
                : 2 === b.length || d.length > 0
                ? (d = " / ")
                : 1 === b.length &&
                  "0" !== b &&
                  "1" !== b &&
                  ((b = "0" + b), (d = " / ")),
              b + d + e)
            : ""
        );
      }),
      p
    );
  });
}.call(this));

(function () {
  var ccnum = document.getElementById("ccnum"),
    type = document.getElementById("ccnum-type"),
    expiry = document.getElementById("expiry"),
    cvc = document.getElementById("cvc"),
    submit = document.getElementById("submit"),
    result = document.getElementById("result");

  payform.cardNumberInput(ccnum);
  payform.expiryInput(expiry);
  payform.cvcInput(cvc);

  ccnum.addEventListener("input", updateType);

  submit.addEventListener("click", function () {
    var valid = [],
      expiryObj = payform.parseCardExpiry(expiry.value);

    valid.push(fieldStatus(ccnum, payform.validateCardNumber(ccnum.value)));
    valid.push(fieldStatus(expiry, payform.validateCardExpiry(expiryObj)));
    valid.push(
      fieldStatus(cvc, payform.validateCardCVC(cvc.value, type.innerHTML))
    );

    result.className = "emoji " + (valid.every(Boolean) ? "valid" : "invalid");
  });

  function updateType(e) {
    var cardType = payform.parseCardType(e.target.value);
    type.innerHTML = cardType || "invalid";
  }

  function fieldStatus(input, valid) {
    if (valid) {
      removeClass(input.parentNode, "error");
    } else {
      addClass(input.parentNode, "error");
    }
    return valid;
  }

  function addClass(ele, _class) {
    if (ele.className.indexOf(_class) === -1) {
      ele.className += " " + _class;
    }
  }

  function removeClass(ele, _class) {
    if (ele.className.indexOf(_class) !== -1) {
      ele.className = ele.className.replace(_class, "");
    }
  }
})();
