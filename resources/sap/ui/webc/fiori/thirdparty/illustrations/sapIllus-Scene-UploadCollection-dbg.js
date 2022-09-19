sap.ui.define(function () { 'use strict';

	var sceneSvg = `<svg width="320" height="240" viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" id="sapIllus-Scene-UploadCollection">
<path d="M285.467 5.75163e-06H13.5035C11.7308 -0.00163111 9.97514 0.346124 8.33689 1.02338C6.69864 1.70064 5.20993 2.69412 3.95584 3.94705C2.70176 5.19997 1.70691 6.68776 1.02814 8.32539C0.349368 9.96301 -7.55706e-07 11.7184 0 13.4911V173.353C0 176.935 1.42268 180.369 3.95508 182.902C6.48749 185.434 9.92216 186.857 13.5035 186.857H285.467C289.049 186.857 292.484 185.434 295.016 182.902C297.548 180.369 298.971 176.935 298.971 173.353V13.4911C298.971 11.7184 298.622 9.96301 297.943 8.32539C297.264 6.68776 296.269 5.19997 295.015 3.94705C293.761 2.69412 292.272 1.70064 290.634 1.02338C288.996 0.346124 287.24 -0.00163111 285.467 5.75163e-06V5.75163e-06Z" fill="var(--sapContent_Illustrative_Color7)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M94.6977 134.301C93.954 134.072 93.2797 133.685 92.7142 133.178C92.5671 133.047 92.4273 132.907 92.2956 132.76C91.7893 132.194 91.4018 131.52 91.1727 130.776C91.1337 130.65 91.0993 130.521 91.0697 130.391C90.9828 130.009 90.937 129.612 90.937 129.204V118.671C93.8825 118.671 96.2703 121.058 96.2703 124.004L96.2703 129.204H101.338C104.284 129.204 106.672 131.591 106.672 134.537H96.2703C95.8622 134.537 95.4648 134.491 95.083 134.404C94.9527 134.375 94.8242 134.34 94.6977 134.301ZM142.149 134.537C142.149 131.591 139.761 129.204 136.815 129.204H126.679C123.733 129.204 121.346 131.591 121.346 134.537H142.149ZM177.625 134.537C177.625 131.591 175.238 129.204 172.292 129.204H162.156C159.21 129.204 156.822 131.591 156.822 134.537H177.625ZM208.034 82.2725C205.088 82.2725 202.701 84.6604 202.701 87.6059V98.0053C202.701 100.951 205.088 103.339 208.034 103.339V82.2725ZM156.822 51.0742C156.822 54.0197 159.21 56.4076 162.156 56.4076H172.292C175.238 56.4076 177.625 54.0197 177.625 51.0742H156.822ZM121.346 51.0742C121.346 54.0197 123.733 56.4076 126.679 56.4076H136.815C139.761 56.4076 142.149 54.0197 142.149 51.0742H121.346ZM90.937 66.9406C93.8825 66.9406 96.2703 64.5528 96.2703 61.6073V56.4076L101.338 56.4076C104.284 56.4076 106.672 54.0197 106.672 51.0742H96.2703C95.8622 51.0742 95.4648 51.1201 95.083 51.2069C94.9527 51.2365 94.8242 51.2709 94.6977 51.3099C93.954 51.539 93.2797 51.9265 92.7141 52.4328C92.5671 52.5645 92.4273 52.7043 92.2956 52.8514C91.7892 53.4169 91.4018 54.0912 91.1727 54.8349C91.1337 54.9614 91.0993 55.0899 91.0697 55.2202C90.9828 55.6021 90.937 55.9995 90.937 56.4076V66.9406ZM90.937 82.2725C93.8825 82.2725 96.2703 84.6603 96.2703 87.6059V98.0053C96.2703 100.951 93.8825 103.339 90.937 103.339V82.2725ZM192.299 51.0742C192.299 54.0197 194.687 56.4076 197.633 56.4076H202.701V61.6073C202.701 64.5528 205.088 66.9406 208.034 66.9406V56.4076C208.034 55.9995 207.988 55.6021 207.901 55.2202C207.872 55.0899 207.837 54.9614 207.798 54.8349C207.569 54.0912 207.182 53.4169 206.675 52.8514C206.544 52.7043 206.404 52.5645 206.257 52.4328C205.691 51.9265 205.017 51.539 204.273 51.3099C204.147 51.2709 204.018 51.2365 203.888 51.2069C203.506 51.1201 203.109 51.0742 202.701 51.0742H192.299ZM208.034 118.671C205.088 118.671 202.701 121.058 202.701 124.004V129.204H197.633C194.687 129.204 192.299 131.591 192.299 134.537H202.701C203.109 134.537 203.506 134.491 203.888 134.404C204.018 134.375 204.147 134.34 204.273 134.301C205.017 134.072 205.691 133.685 206.257 133.178C206.404 133.047 206.544 132.907 206.675 132.76C207.182 132.194 207.569 131.52 207.798 130.776C207.837 130.65 207.872 130.521 207.901 130.391C207.988 130.009 208.034 129.612 208.034 129.204V118.671Z" fill="var(--sapContent_Illustrative_Color2)"/>
<path d="M163.446 107.151C164.01 107.151 164.488 107.368 164.878 107.802C165.312 108.193 165.529 108.67 165.529 109.234C165.529 109.842 165.312 110.341 164.878 110.732C164.488 111.122 164.01 111.318 163.446 111.318H134.279C133.672 111.318 133.173 111.122 132.782 110.732C132.391 110.341 132.196 109.842 132.196 109.234C132.196 108.67 132.391 108.193 132.782 107.802C133.173 107.368 133.672 107.151 134.279 107.151H163.446ZM157.066 85.2109C157.543 85.7318 157.543 86.2309 157.066 86.7083C156.849 86.9253 156.588 87.0339 156.285 87.0339C156.024 87.0339 155.785 86.9253 155.568 86.7083L149.904 81.0443V101.943C149.904 102.637 149.557 102.984 148.863 102.984C148.168 102.984 147.821 102.637 147.821 101.943V81.1745L142.287 86.7083C142.07 86.9253 141.831 87.0339 141.571 87.0339C141.311 87.0339 141.072 86.9253 140.855 86.7083C140.334 86.2309 140.334 85.7318 140.855 85.2109L147.496 78.6354C147.886 78.2014 148.364 77.9844 148.928 77.9844C149.492 77.9844 149.991 78.2014 150.425 78.6354L157.066 85.2109Z" fill="var(--sapContent_Illustrative_Color2)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M157.546 84.7482L157.557 84.7601C157.862 85.0925 158.09 85.501 158.09 85.9756C158.09 86.4571 157.856 86.861 157.537 87.1794C157.197 87.52 156.767 87.7002 156.285 87.7002C155.816 87.7002 155.415 87.4974 155.097 87.1794L150.571 82.6534V101.942C150.571 102.392 150.458 102.852 150.115 103.195C149.773 103.538 149.313 103.651 148.863 103.651C148.413 103.651 147.953 103.538 147.61 103.195C147.267 102.852 147.154 102.392 147.154 101.942V82.7836L142.759 87.1794C142.441 87.4974 142.039 87.7002 141.571 87.7002C141.108 87.7002 140.71 87.5018 140.394 87.1898C140.059 86.8798 139.798 86.4738 139.798 85.9756C139.798 85.4802 140.057 85.0655 140.383 84.7392L140.386 84.7369L147.014 78.174C147.524 77.6148 148.174 77.3174 148.928 77.3174C149.685 77.3174 150.349 77.6163 150.895 78.1625C150.896 78.1629 150.896 78.1633 150.897 78.1637L157.546 84.7482ZM150.425 78.6351C149.991 78.2011 149.492 77.984 148.928 77.984C148.364 77.984 147.886 78.2011 147.495 78.6351L140.855 85.2106C140.334 85.7314 140.334 86.2306 140.855 86.708C141.072 86.925 141.311 87.0335 141.571 87.0335C141.831 87.0335 142.07 86.925 142.287 86.708L147.821 81.1742V101.942C147.821 102.637 148.168 102.984 148.863 102.984C149.557 102.984 149.904 102.637 149.904 101.942V81.0439L155.568 86.708C155.785 86.925 156.024 87.0335 156.285 87.0335C156.588 87.0335 156.849 86.925 157.066 86.708C157.543 86.2306 157.543 85.7314 157.066 85.2106L150.425 78.6351ZM165.35 107.33C164.842 106.778 164.195 106.484 163.446 106.484H134.279C133.497 106.484 132.819 106.771 132.298 107.343C131.788 107.859 131.529 108.503 131.529 109.234C131.529 109.999 131.782 110.674 132.31 111.203C132.839 111.732 133.514 111.984 134.279 111.984H163.446C164.177 111.984 164.821 111.726 165.337 111.215C165.909 110.694 166.196 110.016 166.196 109.234C166.196 108.485 165.902 107.838 165.35 107.33ZM164.878 110.731C165.312 110.341 165.529 109.842 165.529 109.234C165.529 108.67 165.312 108.192 164.878 107.802C164.488 107.368 164.01 107.151 163.446 107.151H134.279C133.672 107.151 133.173 107.368 132.782 107.802C132.391 108.192 132.196 108.67 132.196 109.234C132.196 109.842 132.391 110.341 132.782 110.731C133.173 111.122 133.672 111.317 134.279 111.317H163.446C164.01 111.317 164.488 111.122 164.878 110.731Z" fill="var(--sapContent_Illustrative_Color2)"/>
<path d="M261.6 35.9833C261.6 34.5733 257.507 33.4447 252.038 33.1883C251.725 27.7265 250.521 23.6653 249.111 23.6685C247.701 23.6716 246.528 27.764 246.228 33.254C240.744 33.6292 236.667 34.8547 236.685 36.2678C236.704 37.681 240.778 38.8096 246.247 39.0628C246.575 44.5246 247.764 48.5858 249.171 48.5827C250.578 48.5796 251.756 44.4871 252.057 38.9972C257.541 38.622 261.615 37.3965 261.6 35.9833Z" fill="var(--sapContent_Illustrative_Color18)"/>
<path d="M53.5655 148.083C53.5655 146.532 49.0633 145.291 43.0477 145.009C42.7037 139.001 41.3796 134.534 39.8284 134.537C38.2772 134.541 36.9874 139.042 36.6572 145.081C30.6244 145.494 26.1393 146.842 26.16 148.396C26.1806 149.951 30.6622 151.192 36.6778 151.471C37.039 157.479 38.346 161.946 39.8937 161.943C41.4415 161.939 42.7381 157.438 43.0683 151.399C49.1011 150.986 53.5827 149.638 53.5655 148.083Z" fill="var(--sapContent_Illustrative_Color18)"/>
<path d="M270.32 159.352C270.32 158.365 267.455 157.575 263.626 157.395C263.408 153.572 262.565 150.729 261.578 150.731C260.591 150.734 259.77 153.598 259.56 157.441C255.721 157.704 252.867 158.562 252.88 159.551C252.893 160.54 255.745 161.33 259.573 161.507C259.803 165.331 260.634 168.174 261.619 168.171C262.604 168.169 263.429 165.304 263.64 161.462C267.479 161.199 270.331 160.341 270.32 159.352Z" fill="var(--sapContent_Illustrative_Color18)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M36.1256 24.9144C40.2536 24.9144 43.5999 21.568 43.5999 17.4401C43.5999 13.3122 40.2536 9.96582 36.1256 9.96582C31.9977 9.96582 28.6514 13.3122 28.6514 17.4401C28.6514 21.568 31.9977 24.9144 36.1256 24.9144ZM36.1256 22.9211C39.1528 22.9211 41.6068 20.4671 41.6068 17.44C41.6068 14.4128 39.1528 11.9588 36.1256 11.9588C33.0985 11.9588 30.6445 14.4128 30.6445 17.44C30.6445 20.4671 33.0985 22.9211 36.1256 22.9211Z" fill="var(--sapContent_Illustrative_Color18)"/>
<ellipse cx="19.3086" cy="39.2399" rx="4.35999" ry="4.35999" fill="var(--sapContent_Illustrative_Color18)"/>
<path d="M194.691 76.0297C192.763 76.2773 191.012 77.2804 189.823 78.8187C188.634 80.357 188.103 82.3048 188.348 84.2345L203.444 201.772C203.695 203.701 204.701 205.451 206.24 206.639C207.78 207.827 209.727 208.355 211.655 208.107L294.946 197.41C296.873 197.162 298.622 196.159 299.81 194.62C300.997 193.082 301.525 191.134 301.277 189.206L287.597 82.6969L263.096 67.2439L194.691 76.0297Z" fill="var(--sapContent_Illustrative_Color19)"/>
<path d="M189.151 71.7479C187.223 71.9955 185.473 72.9986 184.283 74.5369C183.094 76.0752 182.563 78.023 182.808 79.9527L197.904 197.49C198.155 199.419 199.161 201.169 200.7 202.357C202.24 203.545 204.187 204.073 206.115 203.826L289.406 193.128C290.36 193.005 291.281 192.696 292.115 192.217C292.95 191.739 293.682 191.1 294.27 190.339C294.858 189.577 295.29 188.707 295.542 187.778C295.794 186.849 295.86 185.879 295.737 184.925L282.058 78.4151L257.556 62.9621L189.151 71.7479Z" fill="var(--sapContent_Illustrative_Color18)"/>
<path d="M259.894 81.2617L282.619 82.8868L282.045 78.4167L259.894 81.2617Z" fill="var(--sapContent_Illustrative_Color20)"/>
<path d="M259.894 81.2619L282.045 78.4169L257.544 62.9639L259.894 81.2619Z" fill="var(--sapContent_Illustrative_Color19)"/>
<path d="M206.656 118.818C206.353 116.453 208.023 114.29 210.387 113.987L263.185 107.205C265.55 106.902 267.713 108.572 268.016 110.937C268.32 113.301 266.649 115.464 264.285 115.767L211.487 122.549C209.123 122.852 206.96 121.182 206.656 118.818Z" fill="var(--sapContent_Illustrative_Color20)"/>
<path d="M210.688 150.211C210.385 147.847 212.055 145.684 214.419 145.38L240.105 142.081C242.469 141.778 244.632 143.448 244.936 145.812C245.239 148.177 243.569 150.34 241.205 150.643L215.519 153.942C213.155 154.246 210.992 152.575 210.688 150.211Z" fill="var(--sapContent_Illustrative_Color20)"/>
<path d="M208.672 134.514C208.368 132.15 210.039 129.987 212.403 129.684L265.201 122.902C267.566 122.599 269.728 124.269 270.032 126.633C270.336 128.998 268.665 131.16 266.301 131.464L213.503 138.245C211.139 138.549 208.976 136.879 208.672 134.514Z" fill="var(--sapContent_Illustrative_Color20)"/>
<path d="M254.285 159.564C253.827 158.165 254.59 156.659 255.989 156.2L300.04 141.766C301.439 141.308 302.946 142.07 303.404 143.47L317.838 187.521C318.297 188.92 317.534 190.427 316.134 190.885L272.084 205.319C270.684 205.777 269.178 205.015 268.719 203.615L254.285 159.564Z" fill="var(--sapContent_Illustrative_Color19)"/>
<path d="M249.578 157.968C249.12 156.569 249.883 155.062 251.282 154.604L295.333 140.17C296.732 139.711 298.239 140.474 298.697 141.874L313.131 185.924C313.59 187.324 312.827 188.83 311.427 189.289L267.377 203.723C265.977 204.181 264.471 203.418 264.012 202.019L249.578 157.968Z" fill="var(--sapContent_Illustrative_Color8)"/>
<path d="M257.828 163.99C257.14 161.891 258.284 159.631 260.383 158.943L289.62 149.364C291.719 148.676 293.979 149.82 294.667 151.919L303.009 177.378C303.696 179.477 302.552 181.737 300.453 182.424L271.216 192.004C269.117 192.692 266.857 191.548 266.169 189.449L257.828 163.99Z" fill="var(--sapContent_Illustrative_Color7)"/>
<path d="M288.943 163.184C292.074 162.159 293.78 158.79 292.754 155.66C291.728 152.529 288.359 150.823 285.229 151.849C282.099 152.875 280.393 156.244 281.419 159.374C282.444 162.504 285.813 164.21 288.943 163.184Z" fill="var(--sapContent_Illustrative_Color18)"/>
<path d="M283.221 181.893C284.236 180.55 285.325 179.256 286.482 178.019L285.015 177.237C275.023 171.878 271.767 169.387 265.223 168.856C263.286 168.651 261.327 168.596 259.368 168.69L266.567 190.662C266.678 191.002 266.86 191.315 267.102 191.583C267.344 191.852 267.642 192.07 267.978 192.226C268.314 192.382 268.681 192.473 269.06 192.493C269.439 192.513 269.821 192.462 270.184 192.342L278.953 189.469C279.962 186.765 281.402 184.21 283.221 181.893Z" fill="var(--sapContent_Illustrative_Color19)"/>
<path d="M290.256 175.469C288.475 175.59 287.03 176.628 285.609 178.171C284.542 179.392 283.542 180.67 282.613 182C280.945 184.293 279.642 186.835 278.75 189.536L301.42 182.108C295.477 179.321 294.031 175.213 290.256 175.469Z" fill="var(--sapContent_Illustrative_Color20)"/>
<path d="M285.3 201.345L283.492 196.46C282.789 194.619 281.417 193.11 279.651 192.236C277.884 191.361 275.853 191.185 273.962 191.743L272.864 192.067C272.035 190.438 270.661 189.151 268.982 188.428C267.303 187.706 265.423 187.594 263.67 188.112L262.308 188.513C261.375 187.141 260.03 186.1 258.468 185.541C256.906 184.982 255.206 184.934 253.615 185.403L251.13 186.136L245.042 170.033C244.628 168.941 243.891 168.002 242.929 167.34C241.968 166.678 240.827 166.324 239.66 166.326C238.813 166.322 237.978 166.524 237.227 166.916C236.476 167.308 235.832 167.877 235.35 168.573C234.868 169.27 234.564 170.074 234.463 170.915C234.362 171.756 234.467 172.608 234.77 173.399L247.888 210.23L241.035 201.77C239.984 200.316 238.431 199.304 236.677 198.93C234.924 198.555 233.093 198.845 231.54 199.742C230.787 200.177 230.233 200.888 229.994 201.723C229.755 202.559 229.849 203.455 230.258 204.223L242.213 224.919C244.6 229.051 248.033 232.482 252.166 234.867C256.298 237.252 260.986 238.509 265.758 238.509H267.57C270.862 238.34 274.077 237.448 276.986 235.897C279.895 234.346 282.428 232.174 284.403 229.535C286.379 226.896 287.75 223.855 288.419 220.626C289.088 217.398 289.038 214.063 288.274 210.856C287.499 207.622 286.505 204.444 285.3 201.345Z" fill="var(--sapContent_Illustrative_Color8)"/>
<path d="M265.75 239.154C260.867 239.146 256.071 237.857 251.841 235.415C247.612 232.973 244.097 229.464 241.648 225.239L229.689 204.547C229.196 203.63 229.079 202.557 229.363 201.556C229.647 200.554 230.31 199.703 231.212 199.181C232.901 198.201 234.896 197.884 236.806 198.293C238.717 198.702 240.407 199.807 241.547 201.393L246.024 206.9L234.165 173.608C233.646 172.216 233.671 170.68 234.234 169.306C234.797 167.932 235.857 166.821 237.203 166.193C237.46 166.068 237.729 165.966 238.005 165.889C239.533 165.489 241.156 165.667 242.561 166.389C243.967 167.112 245.056 168.328 245.619 169.804L251.499 185.354L253.406 184.789C255.052 184.3 256.807 184.324 258.439 184.857C260.071 185.391 261.501 186.408 262.54 187.775L263.466 187.499C265.275 186.964 267.21 187.049 268.966 187.74C270.721 188.43 272.196 189.686 273.156 191.31L273.754 191.134C275.58 190.596 277.533 190.685 279.302 191.386C281.072 192.088 282.555 193.362 283.516 195.005L283.593 194.849L285.921 201.117C287.153 204.296 288.163 207.557 288.943 210.876C289.708 214.166 289.741 217.584 289.041 220.888C288.34 224.193 286.923 227.303 284.889 229.999C282.854 232.696 280.253 234.913 277.268 236.494C274.283 238.076 270.987 238.982 267.614 239.15L265.75 239.154ZM235.155 199.41C233.996 199.41 232.858 199.717 231.857 200.299C231.25 200.649 230.803 201.22 230.609 201.893C230.415 202.566 230.491 203.288 230.819 203.906L242.762 224.582C245.099 228.611 248.451 231.956 252.485 234.284C256.519 236.612 261.093 237.84 265.75 237.848H267.562C270.744 237.685 273.853 236.826 276.668 235.331C279.482 233.837 281.935 231.743 283.852 229.197C285.77 226.652 287.106 223.717 287.766 220.599C288.426 217.481 288.394 214.256 287.672 211.152C286.908 207.902 285.921 204.708 284.719 201.594L282.907 196.728C282.261 195.033 280.999 193.644 279.374 192.837C277.749 192.03 275.879 191.866 274.138 192.376L272.535 192.853L272.295 192.376C271.534 190.881 270.273 189.7 268.732 189.037C267.192 188.374 265.467 188.27 263.859 188.745L262.043 189.282L261.779 188.881C260.925 187.619 259.691 186.661 258.256 186.147C256.821 185.633 255.26 185.59 253.799 186.024L250.741 186.925L244.441 170.257C244.045 169.22 243.323 168.339 242.384 167.747C241.444 167.155 240.338 166.884 239.231 166.975C238.528 167.04 237.85 167.266 237.249 167.637C236.648 168.007 236.14 168.511 235.766 169.109C235.392 169.708 235.161 170.385 235.091 171.087C235.021 171.789 235.114 172.498 235.364 173.159L249.743 213.541L240.525 202.175C239.914 201.321 239.108 200.624 238.174 200.144C237.24 199.663 236.206 199.411 235.155 199.41Z" fill="var(--sapContent_Illustrative_Color4)"/>
<path d="M256.561 200.043C256.432 200.043 256.307 200.006 256.201 199.934C256.094 199.863 256.012 199.761 255.963 199.642L250.541 186.417C250.502 186.338 250.479 186.253 250.475 186.165C250.47 186.078 250.483 185.99 250.513 185.908C250.543 185.826 250.589 185.751 250.649 185.687C250.709 185.623 250.782 185.573 250.862 185.538C250.942 185.503 251.029 185.485 251.116 185.484C251.204 185.484 251.291 185.502 251.371 185.536C251.452 185.57 251.525 185.62 251.585 185.683C251.646 185.747 251.693 185.822 251.723 185.904L257.158 199.161C257.221 199.319 257.22 199.496 257.154 199.653C257.088 199.81 256.962 199.934 256.805 199.999C256.728 200.031 256.644 200.046 256.561 200.043Z" fill="var(--sapContent_Illustrative_Color4)"/>
<path d="M266.251 199.081C266.123 199.082 265.997 199.044 265.891 198.973C265.785 198.901 265.702 198.799 265.654 198.681L261.702 188.769C261.639 188.61 261.642 188.432 261.71 188.275C261.778 188.117 261.906 187.993 262.065 187.93C262.224 187.867 262.402 187.869 262.56 187.937C262.717 188.005 262.841 188.133 262.905 188.293L266.856 198.208C266.918 198.367 266.914 198.545 266.846 198.701C266.778 198.858 266.65 198.982 266.492 199.045C266.415 199.073 266.333 199.086 266.251 199.081Z" fill="var(--sapContent_Illustrative_Color4)"/>
<path d="M275.369 199.081C275.24 199.082 275.113 199.045 275.006 198.973C274.899 198.902 274.816 198.8 274.767 198.68L272.295 192.34C272.24 192.212 272.227 192.069 272.258 191.933C272.289 191.797 272.362 191.674 272.467 191.582C272.545 191.516 272.638 191.469 272.737 191.446C272.837 191.423 272.941 191.424 273.04 191.449C273.14 191.474 273.231 191.522 273.308 191.59C273.385 191.658 273.444 191.743 273.481 191.839L275.974 198.163C276.034 198.3 276.046 198.454 276.009 198.599C275.972 198.744 275.888 198.873 275.769 198.965C275.653 199.048 275.512 199.09 275.369 199.081Z" fill="var(--sapContent_Illustrative_Color4)"/>
<path d="M49.8863 36.1255H53.0428C53.0428 34.4736 53.7051 32.8894 54.8841 31.7213C56.063 30.5532 57.662 29.897 59.3293 29.897H79.6676C81.3349 29.897 82.9339 30.5532 84.1128 31.7213C85.2918 32.8894 85.9541 34.4736 85.9541 36.1255C85.9541 37.7775 85.2918 39.3617 84.1128 40.5298C82.9339 41.6979 81.3349 42.3541 79.6676 42.3541H76.5112C76.5112 44.006 75.8488 45.5903 74.6699 46.7584C73.491 47.9264 71.892 48.5827 70.2247 48.5827H49.8863C48.2191 48.5827 46.6201 47.9264 45.4411 46.7584C44.2622 45.5903 43.5999 44.006 43.5999 42.3541C43.5999 40.7022 44.2622 39.1179 45.4411 37.9498C46.6201 36.7818 48.2191 36.1255 49.8863 36.1255V36.1255Z" fill="var(--sapContent_Illustrative_Color18)"/>
</svg>
`;

	return sceneSvg;

});
