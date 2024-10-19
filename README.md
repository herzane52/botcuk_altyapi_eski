# Botçuk Discord Botumun Eski altyapısı

Bu proje, botçuk botun sadece altyapısını içerir web panel altyapısı için diğer depoya göz atınız. 
https://github.com/herzane52/botcuk_web_site_eski

## Yolculuğumuz 🚀

Bu rehber, projenin nasıl kurulacağı ve çalıştırılacağı hakkında adım adım bilgi vermektedir. Ancak, her adımı atarken, bu projenin her satırının, bir zamanlar neşeyle başladığım ve şimdi hüzünle bırakmak zorunda olduğum bir serüven olduğunu unutmayın. 🥀

### Önkoşullar 📜

Projeyi çalıştırmak için aşağıdaki araçlara ihtiyacınız olacak:

- Node.js 🌐
- npm (Node.js ile birlikte gelir) 📦
- MongoDB 🍃

### Kurulum 🔧

1. Bu depoyu klonlayın veya indirin. 📥
2. Bağımlılıkları yüklemek için terminalde aşağıdaki komutu çalıştırın:
```
npm install
```
3. `config.js` dosyasındaki aşağıdaki yerleri doldurmanız gerekmektedir: 📝

```js
{
"botToken": "BOT_TOKENINIZ",
"mongoURL": "MONGODB_URLSİ",
"topGGToken": "TOPGG_TOKENINIZ"
}
```
4. MongoDB Koleksiyonları 📚
MongoDB’de aşağıdaki koleksiyonlar oluşturulmalıdır:

`autho-register` 📝 
`guvenlik` 🔒 
`kayit` 📇 
`otoRol` 🤖 
`otoYanit` 💬 
`ozelBot` 🌟 
`posts` 📰 

5. Son olarak
Bu proje bir bütündür web panel olmadan bir hiçtir ikisi beraber olmadan sadece token çalıştıran bir projeden farksızdır

# Yardım ve Destek 🆘
Herhangi bir sorunla karşılaşırsanız, Discord üzerinden bana ulaşabilirsiniz: herzane

# Katkıda Bulunma 🤲

Projeyi geliştirmek isteyen herkesin katkıda bulunmasını teşvik ediyorum. Kodları paylaşma kararı aldım çünkü son zamanlarda yaşadığım psikolojik sıkıntılardan dolayı projeyi tamamlayamayabilirim. Eğer ben geliştiremezsem, sizlerin geliştirebileceğine inanıyorum.  🌟

**Bütün dönüşümler farkındalıkla başlar.**: 💖
