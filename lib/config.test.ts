import { defaultCacheUrls } from './config';

describe('Default caches realUrlGetters', () => {
  it('Google webcache', () => {
    const { getRealUrl } = defaultCacheUrls
      .find(({ hostname }) => hostname.includes('google'));
    const testCases = [
      {
        url: 'https://webcache.googleusercontent.com/search?q=cache:wzhkku5cb5IJ:https://cachedview.com/ru+&cd=1&hl=ru&ct=clnk&gl=ru',
        realUrl: 'https://cachedview.com/ru',
      },
      {
        url: 'https://webcache.googleusercontent.com/search?q=cache:Q_4cm9vQv14J:https://support.google.com/websearch/answer/1687222%3Fhl%3Dru+&cd=3&hl=ru&ct=clnk&gl=ru',
        realUrl: 'https://support.google.com/websearch/answer/1687222?hl=ru',
      },
      {
        url: 'https://webcache.googleusercontent.com/search?q=cache:VPtUWYas9LkJ:https://chrome.google.com/webstore/detail/webcache/cmmlgikpahieigpcclckfmhnchdlfnjd%3Fhl%3Dru+&cd=4&hl=ru&ct=clnk&gl=ru',
        realUrl: 'https://chrome.google.com/webstore/detail/webcache/cmmlgikpahieigpcclckfmhnchdlfnjd?hl=ru',
      },
      {
        url: 'https://webcache.googleusercontent.com/search?q=cache:VPtUWYas9LkJ:https://chrome.google.com/webstore/detail/webcache/cmmlgikpahieigpcclckfmhnchdlfnjd%3Fhl%3Dru+&cd=4&hl=ru&ct=clnk&gl=ru',
        realUrl: 'https://chrome.google.com/webstore/detail/webcache/cmmlgikpahieigpcclckfmhnchdlfnjd?hl=ru',
      },
      {
        url: 'https://webcache.googleusercontent.com/search?q=cache:Uk8PClh9qa0J:https://stackoverflow.com/questions/4560400/how-can-i-get-the-google-cache-age-of-any-url-or-web-page+&cd=5&hl=ru&ct=clnk&gl=ru',
        realUrl: 'https://stackoverflow.com/questions/4560400/how-can-i-get-the-google-cache-age-of-any-url-or-web-page',
      },
      {
        url: 'http://webcache.googleusercontent.com/search?q=cache:2ulwUqfwox0J:netler.ru/ikt/cache-google.htm+&cd=6&hl=ru&ct=clnk&gl=ru',
        realUrl: 'http://netler.ru/ikt/cache-google.htm',
      },
      {
        url: 'https://webcache.googleusercontent.com/search?q=cache:HK-Aw6ZKcP0J:https://developers.google.com/search/docs/advanced/debug/search-operators/web-search-cache+&cd=7&hl=ru&ct=clnk&gl=ru',
        realUrl: 'https://developers.google.com/search/docs/advanced/debug/search-operators/web-search-cache',
      },
      {
        url: 'https://webcache.googleusercontent.com/search?q=cache:LH_CepkrBhcJ:https://webapps.stackexchange.com/questions/27414/how-to-use-googles-web-cache-to-view-a-page+&cd=10&hl=ru&ct=clnk&gl=ru',
        realUrl: 'https://webapps.stackexchange.com/questions/27414/how-to-use-googles-web-cache-to-view-a-page',
      },
      {
        url: 'https://webcache.googleusercontent.com/search?q=cache:J4B-1gRHv2oJ:https://www.seochecker.it/google-cache-status+&cd=21&hl=ru&ct=clnk&gl=ru',
        realUrl: 'https://www.seochecker.it/google-cache-status',
      },
      {
        url: 'https://webcache.googleusercontent.com/search?q=cache:kh2jgP7nSzUJ:https://bauinvest.su/obhod-internet-cenzury-s-https-google-webcache/+&cd=22&hl=ru&ct=clnk&gl=ru',
        realUrl: 'https://bauinvest.su/obhod-internet-cenzury-s-https-google-webcache/',
      },
      {
        url: 'https://webcache.googleusercontent.com/search?q=cache:-vdZtUNj7zQJ:https://cachearchive.com/+&cd=24&hl=ru&ct=clnk&gl=ru',
        realUrl: 'https://cachearchive.com/',
      },
      {
        url: 'https://webcache.googleusercontent.com/search?q=cache:3d_giIdalrcJ:https://www.rankwatch.com/blog/google-cache-guide/+&cd=25&hl=ru&ct=clnk&gl=ru',
        realUrl: 'https://www.rankwatch.com/blog/google-cache-guide/',
      },
      {
        url: 'https://webcache.googleusercontent.com/search?q=cache:i4wKguXN4HYJ:https://www.businessinsider.com/clear-cache-chrome+&cd=27&hl=ru&ct=clnk&gl=ru',
        realUrl: 'https://www.businessinsider.com/clear-cache-chrome',
      },
      {
        url: 'https://webcache.googleusercontent.com/search?q=cache:LIPCQBXm0LIJ:https://thriveagency.com/news/how-to-check-if-google-is-caching-your-website-correctly/+&cd=29&hl=ru&ct=clnk&gl=ru',
        realUrl: 'https://thriveagency.com/news/how-to-check-if-google-is-caching-your-website-correctly/',
      },
      {
        url: 'https://webcache.googleusercontent.com/search?q=cache:Av_uGCgpR6EJ:https://artkiev.com/blog/get-page-from-google-cache.htm+&cd=30&hl=ru&ct=clnk&gl=ru',
        realUrl: 'https://artkiev.com/blog/get-page-from-google-cache.htm',
      },
      {
        url: 'https://webcache.googleusercontent.com/search?q=cache:qLlEEoIdmfYJ:https://habr.com/ru/post/136479/+&cd=42&hl=ru&ct=clnk&gl=ru',
        realUrl: 'https://habr.com/ru/post/136479/',
      },
      {
        url: 'https://webcache.googleusercontent.com/search?q=cache:S0iwBehwvA8J:https://help.webex.com/en-us/article/WBX38899/Clear-Cache-and-Cookies-in-Google-Chrome+&cd=45&hl=ru&ct=clnk&gl=ru',
        realUrl: 'https://help.webex.com/en-us/article/WBX38899/Clear-Cache-and-Cookies-in-Google-Chrome',
      },
      {
        url: 'https://webcache.googleusercontent.com/search?q=cache:lJ-Dp7empZoJ:https://xn--d1acynfdde.xn--p1ai/861-studwork_org.html+&cd=4&hl=ru&ct=clnk&gl=ru',
        realUrl: 'https://xn--d1acynfdde.xn--p1ai/861-studwork_org.html',
      }
    ];

    expect(typeof getRealUrl).toEqual('function');

    testCases.forEach(({ url, realUrl }) => {
      const res = getRealUrl(url);

      expect(res).toEqual(realUrl);
    });
  });

  it('Google webcache', () => {
    const { getRealUrl } = defaultCacheUrls
      .find(({ hostname }) => hostname.includes('yandex'));
    const testCases = [
      {
        url: 'https://yandexwebcache.net/yandbtm?fmode=inject&tm=1636646786&tld=ru&lang=en&la=1636358912&text=yandex+cache&url=https%3A//yandex.com/support/browser/personal-data-protection/cache-memory.html&l10n=ru&mime=html&sign=e07eaf065328b19282a1be62209fa139&keyno=0',
        realUrl: 'https://yandex.com/support/browser/personal-data-protection/cache-memory.html',
      },
      {
        url: 'https://yandexwebcache.net/yandbtm?fmode=inject&tm=1636646786&tld=ru&lang=ru&la=1636287744&text=yandex+cache&url=https%3A//ya-browsers.ru/privatnost/kak-posmotret-kesh-v-yandeks-brauzere&l10n=ru&mime=html&sign=88cb5cd510d2cc0f42c8656f5771d253&keyno=0',
        realUrl: 'https://ya-browsers.ru/privatnost/kak-posmotret-kesh-v-yandeks-brauzere',
      },
      {
        url: 'https://yandexwebcache.net/yandbtm?fmode=inject&tm=1636646786&tld=ru&lang=ru&la=1636247680&text=yandex+cache&url=https%3A//zen.yandex.ru/media/tehnichka/chistim-kesh-v-iandeks-brauzere-5fe982180d0c7759ac2078ce&l10n=ru&mime=html&sign=2c2a92cb2b61501ba5df496f8e6236bf&keyno=0',
        realUrl: 'https://zen.yandex.ru/media/tehnichka/chistim-kesh-v-iandeks-brauzere-5fe982180d0c7759ac2078ce',
      },
      {
        url: 'https://yandexwebcache.net/yandbtm?fmode=inject&tm=1636646786&tld=ru&lang=ru&la=1636216832&text=yandex+cache&url=https%3A//yandbrowser.ru/faq/how-to-clear-cache-browser-yandex-and-where-to-find-it&l10n=ru&mime=html&sign=6569b13e255564a7b012c61696706d8a&keyno=0',
        realUrl: 'https://yandbrowser.ru/faq/how-to-clear-cache-browser-yandex-and-where-to-find-it',
      },
      {
        url: 'https://yandexwebcache.net/yandbtm?fmode=inject&tm=1636646786&tld=ru&lang=ru&la=1636288512&text=yandex+cache&url=https%3A//GuideComp.ru/kak-ochistit-kesh-v-yandex-brauzere-na-kompyutere-i-telefone-android.html&l10n=ru&mime=html&sign=8efee59b5bccdf3e4bdef105e6e79bf3&keyno=0',
        realUrl: 'https://GuideComp.ru/kak-ochistit-kesh-v-yandex-brauzere-na-kompyutere-i-telefone-android.html',
      },
      {
        url: 'https://yandexwebcache.net/yandbtm?fmode=inject&tm=1636646786&tld=ru&lang=ru&la=1636254080&text=yandex+cache&url=https%3A//yandex-browser-download.ru/kehsh-yandeks-brauzera&l10n=ru&mime=html&sign=53f868e838b068cc25a6762ebe460c39&keyno=0',
        realUrl: 'https://yandex-browser-download.ru/kehsh-yandeks-brauzera',
      },
      {
        url: 'https://yandexwebcache.net/yandbtm?fmode=inject&tm=1636647189&tld=ru&lang=ru&la=1635168896&text=yandex+cache+test&url=https%3A//www.youtube.com/watch%3Fv%3DpG1eGLj1_K4&l10n=ru&mime=html&sign=cb8a4e6eb98eed6b21eba8325a5d7175&keyno=0',
        realUrl: 'https://www.youtube.com/watch?v=pG1eGLj1_K4',
      },
      {
        url: 'https://yandexwebcache.net/yandbtm?fmode=inject&tm=1636647189&tld=ru&lang=ru&la=1636333184&text=yandex+cache+test&url=https%3A//Lifehacker.ru/udalennaya-stranica/&l10n=ru&mime=html&sign=8785518d4a8c44d2167c6e267144f50f&keyno=0',
        realUrl: 'https://Lifehacker.ru/udalennaya-stranica/',
      },
      {
        url: 'https://yandexwebcache.net/yandbtm?fmode=inject&tm=1636647189&tld=ru&lang=ru&la=1636256128&text=yandex+cache+test&url=https%3A//sergoot.ru/how-to-change-the-cache-size-in-yandex-browser&l10n=ru&mime=html&sign=f63543c4bd15ed6bf61254e54c8c5b4d&keyno=0',
        realUrl: 'https://sergoot.ru/how-to-change-the-cache-size-in-yandex-browser',
      },
      {
        url: 'https://yandexwebcache.net/yandbtm?fmode=inject&tm=1636647189&tld=ru&lang=ru&la=1635855488&text=yandex+cache+test&url=https%3A//xn----8sbcrj6cdv7h.xn--p1ai/gde-nahoditsya-kesh-yandex-br.html&l10n=ru&mime=html&sign=dc946309ee512d54ab0689a8accf6133&keyno=0',
        realUrl: 'https://xn----8sbcrj6cdv7h.xn--p1ai/gde-nahoditsya-kesh-yandex-br.html',
      },
      {
        url: 'https://yandexwebcache.net/yandbtm?fmode=inject&tm=1636647189&tld=ru&lang=ru&la=1636286080&text=yandex+cache+test&url=https%3A//seoportal.net/baza/skorost-zagruzki/kesh-brauzera&l10n=ru&mime=html&sign=3d10e1c789602161e0d5c9f9d1ac4287&keyno=0',
        realUrl: 'https://seoportal.net/baza/skorost-zagruzki/kesh-brauzera',
      },
      {
        url: 'https://yandexwebcache.net/yandbtm?fmode=inject&tm=1636647189&tld=ru&lang=ru&la=1636279808&text=yandex+cache+test&url=https%3A//web-ru.net/prodvizhenie-sajta/seo/kak-posmotret-kesh-stranicy-sajta-v-google-yandeks-bing-i-mail-ru.html&l10n=ru&mime=html&sign=2e565a96d419e372798a09e0c96aff98&keyno=0',
        realUrl: 'https://web-ru.net/prodvizhenie-sajta/seo/kak-posmotret-kesh-stranicy-sajta-v-google-yandeks-bing-i-mail-ru.html',
      },
      {
        url: 'https://yandexwebcache.net/yandbtm?fmode=inject&tm=1636647189&tld=ru&lang=ru&la=1636257792&text=yandex+cache+test&url=https%3A//SoftikBox.com/ochistka-kesh-i-cookie-v-brauzere-yandeks-razlichnymi-sposobami-28475.html&l10n=ru&mime=html&sign=3d4035de6afde7f72b2a99da16631831&keyno=0',
        realUrl: 'https://SoftikBox.com/ochistka-kesh-i-cookie-v-brauzere-yandeks-razlichnymi-sposobami-28475.html',
      },
    ];

    expect(typeof getRealUrl).toEqual('function');

    testCases.forEach(({ url, realUrl }) => {
      const res = getRealUrl(url);

      expect(res).toEqual(realUrl);
    });
  });
});
