sap.ui.define(function () { 'use strict';

  var spotSvg = `<svg width="128" height="128" viewBox="0 0 128 128" id="tnt-Spot-ExternalLink">
  <path fill="var(--sapIllus_PatternShadow)" d="M104.9692,28.2255 L102.2042,28.2255 L102.2042,43.4405 C102.2042,44.7005 100.6642,45.2995 99.8142,44.3705 L97.9182,42.2885 L97.9182,99.7315 C97.9182,101.3885 96.5742,102.7325 94.9172,102.7325 L30.3062,102.7325 L30.3072,104.5755 C30.3072,106.2895 31.6972,107.6795 33.4102,107.6795 L99.5752,107.6795 C101.2892,107.6795 102.6782,106.2895 102.6782,104.5755 L102.6782,46.0565 L103.9962,47.3735 C104.8632,48.2415 106.3452,47.6265 106.3452,46.4015 L106.3452,29.6025 C106.3452,28.8425 105.7292,28.2255 104.9692,28.2255" class="sapIllus_PatternShadow"/>
  <path fill="var(--sapIllus_ObjectFillColor)" d="M94.917,102.7323 L28.5,102.7323 C26.843,102.7323 25.5,101.3883 25.5,99.7313 L25.5,33.3143 C25.5,31.6573 26.843,30.3143 28.5,30.3143 L94.917,30.3143 C96.574,30.3143 97.917,31.6573 97.917,33.3143 L97.917,99.7313 C97.917,101.3883 96.574,102.7323 94.917,102.7323" class="sapIllus_ObjectFillColor"/>
  <path fill="var(--sapIllus_PatternShadow)" d="M73.8437,44.4715 C73.6527,44.8315 73.2767,45.0575 72.8687,45.0575 L42.1297,45.0585 C40.8437,45.0585 40.2427,46.3125 40.2427,47.2135 L40.2427,92.5135 L37.9477,92.5135 C36.7157,92.5135 35.7167,91.5155 35.7167,90.2835 L35.7167,42.6885 C35.7167,41.7865 36.3167,40.5325 37.6047,40.5325 L75.9387,40.5315 L73.8437,44.4715 Z" class="sapIllus_PatternShadow"/>
  <path fill="var(--sapIllus_StrokeDetailColor)" d="M94.814,103.2323 L28.603,103.2323 C26.616,103.2323 25,101.6163 25,99.6283 L25,33.3113 C25,31.9013 25.995,29.8143 28.132,29.8143 L80.661,29.8143 C80.937,29.8143 81.161,30.0383 81.161,30.3143 C81.161,30.5903 80.937,30.8143 80.661,30.8143 L28.179,30.8143 C26.677,30.8143 26,32.3043 26,33.3113 L26,99.6283 C26,101.0643 27.168,102.2323 28.603,102.2323 L94.814,102.2323 C96.25,102.2323 97.418,101.0643 97.418,99.6283 L97.418,47.8943 C97.418,47.6183 97.641,47.3943 97.918,47.3943 C98.194,47.3943 98.418,47.6183 98.418,47.8943 L98.418,99.6283 C98.418,101.6163 96.801,103.2323 94.814,103.2323" class="sapIllus_StrokeDetailColor"/>
  <path fill="var(--sapIllus_BrandColorSecondary)" d="M100.8335,25.4999 L84.0335,25.4999 C82.8035,25.4999 82.1935,26.9799 83.0635,27.8399 L86.7035,31.4899 C87.2335,32.0209 87.2435,32.8799 86.7235,33.4199 L79.0775,41.3359 C79.0385,41.3759 78.9875,41.4159 78.9475,41.4659 L78.0775,42.3459 C77.9585,42.4759 77.8475,42.6159 77.7285,42.7559 C75.8375,45.0459 74.7085,47.9849 74.7085,51.1959 C74.7085,57.1959 78.6775,62.2659 84.1275,63.9459 C82.8975,62.1759 82.1775,60.0159 82.1775,57.6959 C82.1775,54.6859 83.3875,51.9559 85.3575,49.9759 C85.4075,49.9159 85.4675,49.8549 85.5275,49.8059 L92.3835,42.7399 L94.4335,40.6399 C94.9935,40.0799 95.9035,40.0899 96.4435,40.6699 L99.8135,44.3699 C100.6635,45.2999 102.2035,44.6999 102.2035,43.4399 L102.2035,26.8699 C102.2035,26.1099 101.5935,25.4999 100.8335,25.4999" class="sapIllus_BrandColorSecondary"/>
  <path fill="var(--sapIllus_StrokeDetailColor)" d="M78.9585,41.453 L79.3365,41.78 L78.4335,42.697 C78.3745,42.762 78.3065,42.844 78.2375,42.926 L78.1075,43.081 C76.2395,45.345 75.2085,48.228 75.2085,51.196 C75.2085,56.394 78.2735,60.974 82.9645,62.987 C82.1195,61.363 81.6775,59.559 81.6775,57.696 C81.6775,54.645 82.8585,51.778 85.0035,49.623 C85.0425,49.573 85.1255,49.489 85.2085,49.421 L94.0755,40.29 C94.4505,39.916 94.9665,39.725 95.4615,39.727 C95.9785,39.737 96.4575,39.95 96.8095,40.329 L100.1835,44.033 C100.4365,44.31 100.7955,44.395 101.1455,44.261 C101.4155,44.156 101.7035,43.886 101.7035,43.44 L101.7035,26.87 C101.7035,26.382 101.3215,26 100.8335,26 L84.0335,26 C83.6645,26 83.3615,26.202 83.2225,26.541 C83.0845,26.876 83.1565,27.228 83.4155,27.484 L87.0575,31.137 C87.7755,31.855 87.7885,33.035 87.0835,33.766 L79.4375,41.683 L78.9585,41.453 Z M84.1275,64.446 C84.0785,64.446 84.0295,64.439 83.9805,64.424 C78.1355,62.622 74.2085,57.306 74.2085,51.196 C74.2085,47.997 75.3215,44.887 77.3425,42.437 L77.4685,42.287 C77.5485,42.191 77.6265,42.097 77.7095,42.007 L78.5925,41.114 C78.6005,41.1 78.6475,41.054 78.6945,41.011 L86.3635,33.072 C86.6925,32.731 86.6865,32.18 86.3505,31.844 L82.7095,28.193 C82.1635,27.653 82.0045,26.874 82.2975,26.161 C82.5915,25.445 83.2565,25 84.0335,25 L100.8335,25 C101.8645,25 102.7035,25.839 102.7035,26.87 L102.7035,43.44 C102.7035,44.223 102.2335,44.911 101.5075,45.193 C100.7795,45.476 99.9715,45.284 99.4445,44.707 L96.0745,41.007 C95.9125,40.832 95.6865,40.731 95.4435,40.727 C95.1805,40.701 94.9625,40.816 94.7875,40.993 L85.8865,50.154 C85.8095,50.222 85.7725,50.259 85.7415,50.296 C83.7555,52.295 82.6775,54.912 82.6775,57.696 C82.6775,59.846 83.3215,61.908 84.5385,63.661 C84.6605,63.836 84.6575,64.069 84.5315,64.241 C84.4355,64.372 84.2845,64.446 84.1275,64.446 L84.1275,64.446 Z" class="sapIllus_StrokeDetailColor"/>
  <path fill="var(--sapIllus_StrokeDetailColor)" d="M85.4726,93.0145 L37.9446,93.0145 C36.4406,93.0145 35.2166,91.7905 35.2166,90.2865 L35.2166,42.6825 C35.2166,41.4075 36.1306,40.0315 37.6066,40.0315 L75.3126,40.0315 C75.5896,40.0315 75.8126,40.2545 75.8126,40.5315 C75.8126,40.8075 75.5896,41.0315 75.3126,41.0315 L37.6396,41.0315 C36.6586,41.0315 36.2166,42.0165 36.2166,42.6825 L36.2166,90.2865 C36.2166,91.2395 36.9926,92.0145 37.9446,92.0145 L85.4726,92.0145 C86.4256,92.0145 87.2006,91.2395 87.2006,90.2865 L87.2006,52.9235 C87.2006,52.6475 87.4246,52.4235 87.7006,52.4235 C87.9766,52.4235 88.2006,52.6475 88.2006,52.9235 L88.2006,90.2865 C88.2006,91.7905 86.9766,93.0145 85.4726,93.0145" class="sapIllus_StrokeDetailColor"/>
</svg>`;

  return spotSvg;

});
