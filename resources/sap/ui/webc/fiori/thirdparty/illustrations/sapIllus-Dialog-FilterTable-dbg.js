sap.ui.define(function () { 'use strict';

	var dialogSvg = `<svg width="160" height="156" viewBox="0 0 160 156" fill="none" xmlns="http://www.w3.org/2000/svg" id="sapIllus-Dialog-FilterTable">
<circle cx="82.4128" cy="77.5872" r="77.5872" fill="var(--sapContent_Illustrative_Color7)"/>
<path d="M93.5321 32.0046H9.24732C4.14017 32.0046 0 36.1448 0 41.252V145.495C0 150.602 4.14017 154.742 9.24732 154.742H93.5321C98.6393 154.742 102.779 150.602 102.779 145.495V41.252C102.779 36.1448 98.6393 32.0046 93.5321 32.0046Z" fill="var(--sapContent_Illustrative_Color8)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.4751 41.9416C9.4751 41.5212 9.59062 41.1843 9.73181 41.1843H92.5149C92.6561 41.1843 92.7716 41.5052 92.7716 41.9416V144.808C92.7716 145.228 92.6561 145.565 92.5149 145.565H9.73181C9.59062 145.565 9.4751 145.244 9.4751 144.808V41.9416Z" fill="var(--sapContent_Illustrative_Color8)"/>
<path d="M92.778 51.0315H9.4751V59.5569H92.778V51.0315Z" fill="var(--sapContent_Illustrative_Color18)"/>
<path d="M14.2977 54.2534H28.6211C29.0896 54.2534 29.4714 54.7636 29.4714 55.3925C29.4714 56.0342 29.0896 56.5284 28.6211 56.5284H14.2977C13.8261 56.5284 13.4442 56.0182 13.4442 55.3925C13.4442 54.7636 13.8132 54.2534 14.2977 54.2534Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M14.2977 62.5896H25.9259C26.3943 62.5896 26.7762 63.0998 26.7762 63.7255C26.7762 64.3672 26.3943 64.8645 25.9259 64.8645H14.2977C13.8261 64.8645 13.4442 64.3543 13.4442 63.7255C13.4442 63.0998 13.8132 62.5896 14.2977 62.5896Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M14.2977 71.3071H27.774C28.2457 71.3071 28.6276 71.8173 28.6276 72.443C28.6276 73.0847 28.2457 73.5821 27.774 73.5821H14.2977C13.8261 73.5821 13.4442 73.0719 13.4442 72.443C13.4442 71.8141 13.8132 71.3071 14.2977 71.3071Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M14.2977 79.6497H20.3942C20.8658 79.6497 21.2445 80.1598 21.2445 80.7855C21.2445 81.4272 20.8658 81.9214 20.3942 81.9214H14.2977C13.8261 81.9214 13.4442 81.4144 13.4442 80.7855C13.4442 80.1502 13.8132 79.6497 14.2977 79.6497Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M14.2977 88.1653H20.3942C20.8658 88.1653 21.2445 88.6723 21.2445 89.3012C21.2445 89.9429 20.8658 90.437 20.3942 90.437H14.2977C13.8261 90.437 13.4442 89.9301 13.4442 89.3012C13.4442 88.6723 13.8132 88.1653 14.2977 88.1653Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M14.2977 105.216H20.3942C20.8658 105.216 21.2445 105.723 21.2445 106.352C21.2445 106.994 20.8658 107.488 20.3942 107.488H14.2977C13.8261 107.488 13.4442 106.978 13.4442 106.352C13.4442 105.723 13.8132 105.216 14.2977 105.216Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M14.2977 96.6912H20.3942C20.8658 96.6912 21.2445 97.1981 21.2445 97.827C21.2445 98.4688 20.8658 98.9629 20.3942 98.9629H14.2977C13.8261 98.9629 13.4442 98.4559 13.4442 97.827C13.4442 97.1981 13.8132 96.6912 14.2977 96.6912Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M14.2977 113.738H20.3942C20.8658 113.738 21.2445 114.248 21.2445 114.877C21.2445 115.519 20.8658 116.013 20.3942 116.013H14.2977C13.8261 116.013 13.4442 115.503 13.4442 114.877C13.4442 114.248 13.8132 113.738 14.2977 113.738Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M14.2689 122.299H20.3653C20.8338 122.299 21.2156 122.809 21.2156 123.435C21.2156 124.077 20.8338 124.574 20.3653 124.574H14.2689C13.8004 124.574 13.4186 124.064 13.4186 123.435C13.4186 122.809 13.8133 122.299 14.2689 122.299Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M44.2441 54.2534H58.5675C59.036 54.2534 59.4178 54.7636 59.4178 55.3925C59.4178 56.0342 59.036 56.5284 58.5675 56.5284H44.2441C43.7724 56.5284 43.3906 56.0182 43.3906 55.3925C43.3906 54.7636 43.7724 54.2534 44.2441 54.2534Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M44.2441 62.5896H55.8722C56.3407 62.5896 56.7225 63.0998 56.7225 63.7255C56.7225 64.3672 56.3407 64.8645 55.8722 64.8645H44.2441C43.7724 64.8645 43.3906 64.3543 43.3906 63.7255C43.3906 63.0998 43.7724 62.5896 44.2441 62.5896Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M44.2441 71.3071H57.7204C58.1921 71.3071 58.5739 71.8173 58.5739 72.443C58.5739 73.0847 58.1921 73.5821 57.7204 73.5821H44.2441C43.7724 73.5821 43.3906 73.0719 43.3906 72.443C43.3906 71.8141 43.7724 71.3071 44.2441 71.3071Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M44.2441 79.6497H50.3405C50.8122 79.6497 51.1908 80.1598 51.1908 80.7855C51.1908 81.4272 50.8122 81.9214 50.3405 81.9214H44.2441C43.7724 81.9214 43.3906 81.4144 43.3906 80.7855C43.3906 80.1502 43.7724 79.6497 44.2441 79.6497Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M44.2441 88.1653H50.3405C50.8122 88.1653 51.1908 88.6723 51.1908 89.3012C51.1908 89.9429 50.8122 90.437 50.3405 90.437H44.2441C43.7724 90.437 43.3906 89.9301 43.3906 89.3012C43.3906 88.6723 43.7724 88.1653 44.2441 88.1653Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M44.2441 105.216H50.3405C50.8122 105.216 51.1908 105.723 51.1908 106.352C51.1908 106.994 50.8122 107.488 50.3405 107.488H44.2441C43.7724 107.488 43.3906 106.978 43.3906 106.352C43.3906 105.723 43.7724 105.216 44.2441 105.216Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M44.2441 96.6912H50.3405C50.8122 96.6912 51.1908 97.1981 51.1908 97.827C51.1908 98.4688 50.8122 98.9629 50.3405 98.9629H44.2441C43.7724 98.9629 43.3906 98.4559 43.3906 97.827C43.3906 97.1981 43.7724 96.6912 44.2441 96.6912Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M44.2441 113.738H50.3405C50.8122 113.738 51.1908 114.248 51.1908 114.877C51.1908 115.519 50.8122 116.013 50.3405 116.013H44.2441C43.7724 116.013 43.3906 115.503 43.3906 114.877C43.3906 114.248 43.7724 113.738 44.2441 113.738Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M44.2152 122.299H50.3116C50.7801 122.299 51.1619 122.809 51.1619 123.435C51.1619 124.077 50.7801 124.574 50.3116 124.574H44.2152C43.7467 124.574 43.3649 124.064 43.3649 123.435C43.3649 122.809 43.7467 122.299 44.2152 122.299Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M73.8502 54.2534H88.1736C88.6421 54.2534 89.0239 54.7636 89.0239 55.3925C89.0239 56.0342 88.6421 56.5284 88.1736 56.5284H73.8502C73.3785 56.5284 72.9967 56.0182 72.9967 55.3925C72.9967 54.7636 73.3785 54.2534 73.8502 54.2534Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M73.8502 62.5896H85.4784C85.9468 62.5896 86.3287 63.0998 86.3287 63.7255C86.3287 64.3672 85.9468 64.8645 85.4784 64.8645H73.8502C73.3785 64.8645 72.9967 64.3543 72.9967 63.7255C72.9967 63.0998 73.3785 62.5896 73.8502 62.5896Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M73.8502 71.3071H87.3265C87.7982 71.3071 88.18 71.8173 88.18 72.443C88.18 73.0847 87.7982 73.5821 87.3265 73.5821H73.8502C73.3785 73.5821 72.9967 73.0719 72.9967 72.443C72.9967 71.8141 73.3785 71.3071 73.8502 71.3071Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M73.8502 79.6497H79.9466C80.4151 79.6497 80.7969 80.1598 80.7969 80.7855C80.7969 81.4272 80.4151 81.9214 79.9466 81.9214H73.8502C73.3785 81.9214 72.9967 81.4144 72.9967 80.7855C72.9967 80.1502 73.3785 79.6497 73.8502 79.6497Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M73.8502 88.1653H79.9466C80.4151 88.1653 80.7969 88.6723 80.7969 89.3012C80.7969 89.9429 80.4151 90.437 79.9466 90.437H73.8502C73.3785 90.437 72.9967 89.9301 72.9967 89.3012C72.9967 88.6723 73.3785 88.1653 73.8502 88.1653Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M73.8502 105.216H79.9466C80.4151 105.216 80.7969 105.723 80.7969 106.352C80.7969 106.994 80.4151 107.488 79.9466 107.488H73.8502C73.3785 107.488 72.9967 106.978 72.9967 106.352C72.9967 105.723 73.3785 105.216 73.8502 105.216Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M73.8502 96.6912H79.9466C80.4151 96.6912 80.7969 97.1981 80.7969 97.827C80.7969 98.4688 80.4151 98.9629 79.9466 98.9629H73.8502C73.3785 98.9629 72.9967 98.4559 72.9967 97.827C72.9967 97.1981 73.3785 96.6912 73.8502 96.6912Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M73.8502 113.738H79.9466C80.4151 113.738 80.7969 114.248 80.7969 114.877C80.7969 115.519 80.4151 116.013 79.9466 116.013H73.8502C73.3785 116.013 72.9967 115.503 72.9967 114.877C72.9967 114.248 73.3785 113.738 73.8502 113.738Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M73.8149 122.299H79.9113C80.383 122.299 80.7648 122.809 80.7648 123.435C80.7648 124.077 80.383 124.574 79.9113 124.574H73.8149C73.3432 124.574 72.9646 124.064 72.9646 123.435C72.971 122.809 73.3496 122.299 73.8149 122.299Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M31.7335 44.2136H15.4336C14.3349 44.2136 13.4442 45.1043 13.4442 46.203C13.4442 47.3017 14.3349 48.1923 15.4336 48.1923H31.7335C32.8322 48.1923 33.7229 47.3017 33.7229 46.203C33.7229 45.1043 32.8322 44.2136 31.7335 44.2136Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M71.4606 63.57L99.2006 93.1823C99.31 93.301 99.3705 93.4569 99.3699 93.6187V122.487C99.369 122.78 99.4456 123.067 99.5919 123.32C99.7381 123.573 99.9487 123.782 100.202 123.926C100.455 124.07 100.742 124.144 101.033 124.139C101.324 124.135 101.609 124.052 101.858 123.901L120.647 112.561C120.889 112.416 121.09 112.21 121.23 111.963C121.369 111.716 121.443 111.437 121.444 111.153L121.531 93.6187C121.532 93.4601 121.591 93.3074 121.698 93.1905L150.017 62.3677L71.4606 63.57Z" fill="var(--sapContent_Illustrative_Color2)"/>
<path d="M118.074 93.4239V113.006C118.074 113.117 118.103 113.225 118.158 113.321C118.214 113.416 118.293 113.495 118.389 113.55C118.484 113.604 118.592 113.632 118.702 113.631C118.812 113.629 118.92 113.598 119.014 113.541L120.346 112.737C120.678 112.536 120.953 112.251 121.145 111.912C121.336 111.573 121.437 111.189 121.438 110.799L121.523 93.8548C121.526 93.5404 121.645 93.2382 121.856 93.0067L149.034 63.4273C149.116 63.3372 149.17 63.225 149.189 63.1045C149.209 62.9839 149.193 62.8603 149.143 62.7488C149.093 62.6373 149.012 62.5429 148.91 62.4771C148.808 62.4114 148.688 62.3772 148.567 62.3787C148.499 62.3803 148.431 62.3933 148.368 62.4171L132.803 68.0717C132.666 68.1223 132.551 68.2194 132.478 68.3462L118.156 93.0972C118.1 93.1966 118.072 93.3095 118.074 93.4239Z" fill="var(--sapContent_Illustrative_Color13)"/>
<path d="M110.052 68.1596C133.172 68.1596 151.914 62.9636 151.914 56.554C151.914 50.1445 133.172 44.9485 110.052 44.9485C86.9317 44.9485 68.1891 50.1445 68.1891 56.554C68.1891 62.9636 86.9317 68.1596 110.052 68.1596Z" fill="var(--sapContent_Illustrative_Color13)"/>
<path d="M151.915 56.5651C151.915 53.6665 148.078 51.0176 141.738 48.9836L133.123 66.252C144.444 64.1631 151.915 60.6002 151.915 56.5651Z" fill="var(--sapContent_Illustrative_Color14)"/>
<path d="M110.052 70.4378C98.6735 70.4378 87.9478 69.1999 79.8516 66.9573C70.6112 64.3935 65.9255 60.8964 65.9255 56.554C65.9255 52.2115 70.6085 48.7172 79.8516 46.1534C87.9478 43.9108 98.6735 42.6729 110.052 42.6729C121.43 42.6729 132.17 43.9108 140.255 46.1534C149.495 48.7172 154.181 52.2142 154.181 56.554C154.181 60.8937 149.498 64.3935 140.255 66.9573C132.159 69.1916 121.433 70.4378 110.052 70.4378ZM110.052 47.2267C99.0695 47.2267 88.7697 48.4043 81.0557 50.5426C72.6701 52.8675 70.4556 55.4834 70.4556 56.554C70.4556 57.6245 72.6701 60.2431 81.0557 62.5681C88.7697 64.7064 99.0777 65.884 110.052 65.884C121.026 65.884 131.334 64.7064 139.051 62.5681C147.434 60.2431 149.651 57.6272 149.651 56.554C149.651 55.4807 147.434 52.8675 139.051 50.5426C131.334 48.4043 121.037 47.2322 110.052 47.2322V47.2267Z" fill="var(--sapContent_Illustrative_Color2)"/>
<path d="M82.4364 23.6228C82.4364 22.2506 78.4532 21.1522 73.1312 20.9027C72.8269 15.5874 71.6554 11.6351 70.283 11.6382C68.9107 11.6412 67.7696 15.6239 67.4775 20.9666C62.1402 21.3317 58.1722 22.5244 58.1905 23.8996C58.2087 25.2748 62.1737 26.3732 67.4957 26.6196C67.8152 31.935 68.9715 35.8872 70.3408 35.8842C71.7101 35.8811 72.8573 31.8985 73.1494 26.5558C78.4867 26.1907 82.4516 24.998 82.4364 23.6228Z" fill="var(--sapContent_Illustrative_Color3)"/>
<path d="M99.8935 33.8669C99.8935 33.0985 97.663 32.4834 94.6826 32.3437C94.5122 29.3671 93.8562 27.1538 93.0876 27.1555C92.3191 27.1572 91.6801 29.3875 91.5165 32.3794C88.5277 32.5839 86.3056 33.2518 86.3158 34.0219C86.3261 34.792 88.5464 35.4071 91.5268 35.5451C91.7057 38.5217 92.3532 40.735 93.12 40.7333C93.8868 40.7316 94.5293 38.5013 94.6928 35.5094C97.6817 35.3049 99.9021 34.637 99.8935 33.8669Z" fill="var(--sapContent_Illustrative_Color3)"/>
</svg>
`;

	return dialogSvg;

});
