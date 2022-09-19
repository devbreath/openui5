sap.ui.define(function () { 'use strict';

  var spotSvg = `<svg width="128" height="128" viewBox="0 0 128 128" id="tnt-Spot-NoApplications">
  <path fill="var(--sapIllus_ObjectFillColor)" d="M95.999,106.111912 L32,106.111912 C30.343,106.111912 29,104.767912 29,103.110912 L29,39.1129117 C29,37.4559117 30.343,36.1119117 32,36.1119117 L95.999,36.1119117 C97.656,36.1119117 99,37.4559117 99,39.1129117 L99,103.110912 C99,104.767912 97.656,106.111912 95.999,106.111912" class="sapIllus_ObjectFillColor"/>
  <path fill="var(--sapIllus_BrandColorSecondary)" d="M99,49.1119117 L29,49.1119117 L29,39.1069117 C29,37.4529117 30.341,36.1119117 31.995,36.1119117 L96.004,36.1119117 C97.659,36.1119117 99,37.4529117 99,39.1069117 L99,49.1119117 Z" class="sapIllus_BrandColorSecondary"/>
  <path fill="var(--sapIllus_StrokeDetailColor)" d="M96,105.111912 L32,105.111912 C30.895,105.111912 30,104.215912 30,103.111912 L30,49.1119117 L31.821,49.1119117 L98,52.0149117 L98,103.111912 C98,104.215912 97.104,105.111912 96,105.111912 M98,39.1119117 L98,48.1119117 L30,48.1119117 L30,39.1119117 C30,38.0069117 30.895,37.1119117 32,37.1119117 L96,37.1119117 C97.104,37.1119117 98,38.0069117 98,39.1119117 M96,36.1119117 L95.526,36.1119117 L31.59,36.1119117 L31.544,36.1119117 C29.817,36.1119117 29,37.8029117 29,39.0089117 L29,49.1119117 L29,103.111912 C29,104.767912 30.343,106.111912 32,106.111912 L96,106.111912 C97.657,106.111912 99,104.767912 99,103.111912 L99,52.1059117 L99,49.0619117 L99,39.1119117 C99,37.4549117 97.657,36.1119117 96,36.1119117" class="sapIllus_StrokeDetailColor"/>
  <path fill="var(--sapIllus_AccentColor)" d="M83.5234,48.5025117 C81.2354,48.8945117 78.7554,49.1455117 76.5174,48.5415117 L74.1164,47.5085117 L74.1334,57.5775117 C74.1454,65.2035117 74.6524,70.1505117 75.7124,77.7275117 C75.9284,79.2615117 76.0254,80.8155117 76.0024,82.3915117 C75.9864,83.5315117 76.9004,84.4765117 78.0424,84.4935117 L80.0644,84.5277731 C80.6354,84.5365117 81.1564,84.3125117 81.5394,83.9425117 C81.9204,83.5735117 82.1624,83.0595117 82.1714,82.4875117 C82.1984,80.9295117 82.3484,79.3515117 82.6184,77.7995117 C83.9364,70.2475117 84.6084,65.3145117 84.8714,57.7055117 L85.1984,48.2155117 L83.5234,48.5025117 Z" class="sapIllus_AccentColor"/>
  <path fill="var(--sapIllus_ObjectFillColor)" d="M79.9922,27.7242117 L79.9922,27.7242117 C76.9792,27.6752117 74.5142,30.1142117 74.5332,33.1262117 L74.5572,48.0832117 L75.1802,48.2512117 C78.3302,49.0992117 81.6592,49.0172117 84.7642,48.0122117 L85.2702,33.3032117 C85.3882,30.2922117 83.0052,27.7742117 79.9922,27.7242117" class="sapIllus_ObjectFillColor"/>
  <path fill="var(--sapIllus_StrokeDetailColor)" d="M75.0571,47.7008117 L75.3101,47.7688117 C78.2641,48.5608117 81.3551,48.5178117 84.2771,47.6398117 L84.7711,33.2858117 C84.8221,31.9638117 84.3501,30.7078117 83.4421,29.7468117 C82.5341,28.7868117 81.3061,28.2458117 79.9841,28.2238117 C78.6801,28.1908117 77.4161,28.7038117 76.4761,29.6338117 C75.5371,30.5628117 75.0251,31.8028117 75.0330076,33.1238117 L75.0571,47.7008117 Z M79.5711,49.3338117 C78.0551,49.3338117 76.5361,49.1348117 75.0501,48.7338117 L74.4271,48.5658117 C74.2091,48.5078117 74.0581,48.3098117 74.0571,48.0848117 L74.0331,33.1278117 C74.0231,31.5378117 74.6411,30.0438117 75.7731,28.9228117 C76.9051,27.8018117 78.3811,27.2078117 80.0001,27.2238117 C81.5931,27.2508117 83.0741,27.9028117 84.1681,29.0598117 C85.2631,30.2178117 85.8321,31.7308117 85.7701,33.3228117 L85.2641,48.0298117 C85.2571,48.2398117 85.1181,48.4238117 84.9181,48.4878117 C83.1781,49.0518117 81.3761,49.3338117 79.5711,49.3338117 L79.5711,49.3338117 Z" class="sapIllus_StrokeDetailColor"/>
  <path fill="var(--sapIllus_AccentColor)" d="M77.9297,30.1412117 L81.9737,30.2072117 L82.0827,23.5902117 C82.0967,22.7352117 81.4147,22.0302117 80.5597,22.0162117 L79.6127,22.0002117 C78.7577,21.9862117 78.0527,22.6682117 78.0387,23.5242117 L77.9297,30.1412117 Z" class="sapIllus_AccentColor"/>
  <path fill="var(--sapIllus_StrokeDetailColor)" d="M78.042 84.4937117C77.766 84.4897117 77.504 84.4287117 77.264 84.3257117L78.136 88.5197117C78.362 89.3917117 79.593 89.4127117 79.849 88.5487117L80.859 84.3817117C80.613 84.4787117 80.345 84.5317117 80.064 84.5277117L78.042 84.4937117zM80.1787 31.0650117C79.2297 31.0650117 78.0087 30.8450117 77.3987 30.2280117 77.2047 30.0310117 77.2067 29.7140117 77.4037 29.5210117 77.5987 29.3270117 77.9157 29.3290117 78.1107 29.5250117 78.4277 29.8460117 79.2937 30.0580117 80.1977 30.0650117 81.0007 30.0620117 81.5367 29.8850117 81.6947 29.7230117 81.8877 29.5260117 82.2037 29.5200117 82.4017 29.7130117 82.5997 29.9060117 82.6037 30.2220117 82.4117 30.4200117 81.8507 30.9970117 80.6787 31.0630117 80.2007 31.0650117L80.1787 31.0650117z" class="sapIllus_StrokeDetailColor"/>
  <path fill="var(--sapIllus_PatternShadow)" d="M99.9562,40.999 L99.0002,40.999 L99.0002,48.949 L99.0002,51.993 L99.0002,102.999 C99.0002,104.656 97.6572,105.999 96.0002,105.999 L33.0442,105.999 L33.0452,107.998 C33.0452,109.655 34.3882,110.999 36.0442,110.999 L101.0002,110.999 C102.6572,110.999 104.0002,109.656 104.0002,107.999 L104.0002,43.999 C104.0002,42.342 101.6572,40.999 100.0002,40.999 L99.9562,40.999 Z" class="sapIllus_PatternShadow"/>
</svg>`;

  return spotSvg;

});
