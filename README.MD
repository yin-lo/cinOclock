# CinO'Clock

## Présentation

Ah, salut !

C'est toi le nouveau Dev. NodeJS ? Parfait, on est sur une application qui doit afficher l'hitoire incoryable de petits chiots trop mignons !

Tu tombe à pique, Thibault, notre dev Front, vient juste de finir l'intégration. Elle est dispo dans le répertoire `integration` de ce repo Github. Il y a grosso-modo trois pages :

- L'acceuil
- De quoi lister les chiots
- Une page de détail

Le tout avec de fausses données pour qu'on puisse avoir une idée du rendu attendu. Il t'as mis aussi un fichier css et des images.

Ton job maintenant, ça va être de te servir de cette intégration et de mettre en place toute la logique qui va bien :

- Mise en place des templates
- Getion de la navigation
- Bref, tu connais la musique ...

On va travailler ensemble aujourd'hui. Je suis loin d'être un cadore comme toi mais en pair programming on devrait pouvoir sortir quelque chose de top.

Ah, dernier détail avant qu'on commence, on nous a laissé un module JS avec des données pour que tu puisse mettre tout ça en place rapidement. Regarde, c'est dans le fichier `data/dogs.js` !

Allé, c'est parti !!!

## Etape 1 : mise en place du serveur

 1 - Ok, je te conseil de cloner le repo, et de le transformer en projet node avec NPM. Tu te souvient comment on fait ?
 <details>

 `npm init -y`

 </details>

 2 - Parfait, maintenant je pense que tu vsa avoir besoin de modules fournis par la communautée. Un pour mettre en place ton serveur et un autre qui servira pour créer tes templates. Il parait que les Devs Node ne jurent que par Express et EJS.
 <details> 

`npm install express`

 `npm install ejs`

 </details>

 3 - Tu fera attention a ce que ton fichier `package.json` déclare ton `main` ne soit pas un `index.js` ! Je me rappel avoir entendu Hervé, notre DSI hurler après un dev parce qu'il avait laissé `index.js` en fichier principal. De ce qu'il m'a dit on gère 132 sites en NodeJS et y'en a encore une grosse trentaine avec ce nom de fichier principal. Et, apparament les administrateurs systèmes galèrent a identifier les processus à cause de ça. Il vaut mieux le renommer. Pourquoi pas `cinoclock.js` le nom du projet, c'est cohérent !

 4 - Bon maintenant qu'on a ce fichier principal faut le remplir. Tiens ton prédécesseur m'a laissé ça. Il m'a dit que ça pourrait aider le suivant. Bon, je ne pense pas que déclarer les routes tout de suite soit pertinent. On va juste faire en sorte que le serveur tourne pour le moment et mettre en place EJS et les statics dans Express
 <details>

```js
/*============================
* Import des modules
*==============================*/
// principaelement express et nos module à nous 

/*============================
* Configuration d'express
*==============================*/
// On initialise express
// On peut configurer le port dans une constante

// ! On indique à express que les contenus CSS, médias et JavasCript Front sont stocké dans le dossier public de notre projet



// On déclare qu'expresse va utiliser le moteur de template EJS

/*============================
* Définitions des routes
*==============================*/
// Les app.get

/*============================
* Lancement du serveur
*==============================*/
// Le listen
```

 </details>

## Etape 2 : Développement de la page d'accueil

1 - Si tu ne l'a pas déjà fait, tu devrais commencer par créer le répertoire `views` que demande EJS pour y mettre les templates. Et le dossier `public` pour les fichiers statiques (CSS et Images) histoire que tout soit près.

2 - Vu que les fichiers CSS et les images sont statiques, j'imagine qu'on doit pouvoir les dupliquer dans notre répertoire `public` pour qu'express puisse y accéder. Tu en pense quoi ?

3 - On va essayer de faire pareil avec le code HTML qu'a fourni Thibaut. on va essayer de copier le code de `index.html` et de le mettre dans un fichier `home.ejs` qu'on va créer dans view.
Ok, on va aussi aller créer la route `/` dans notre fichier `ocooking.js` et faire en sorte qu'elle rende le template EJS qu'on vient de créer.

Oh un post-it sur le sol
<details>

```js
// Pour rendre un fichier ejs, il faut utiliser la fonction render de l'objet res
// Cette fonction prend en paramètre une chaine de caractère qui est le chemin relatif depuis le répertoire views. Si le template est a la racine et se nomme "nom_template.ejs" ça donne :
res.render('mon_template');

```

</details>

4 - Ok, on y est prèsque. Il faut maintenant qu'on corrige les liens vers les ressources statiques. Oui, maintenant qu'il sont dans le dossier `public` on doit pouvoir accéder aux fichier CSS et aux images comme si on passait par une URL express.
<details>

```

Si mon arborescense de projet resemble à ça 
- public
    - css
        - style.css
    - img
        - img.jpg
         ....
- views
    ...

le lien pour accéder aux ressoure public commence par / pouis on accès aux sous répertoires de public : 
- /css/...
-/img/...

```

</details>

5 - Ok parfait, on peut aussi modifier les liens de la barre de navigation.
On sait déjà que l'accueil pointe sur `/` on peut ensuite imaginer que `Nos chiots` poite vers `/dogs`

Wooohhhooooo, la première page est prête. On passe au suivantes !!!!

Quoi ? Tu voudrais qu'on rationnalise le `head` et la barre de menu ? Oui, c'est pas une mauvaise idée vu qu'ils apparaissent sur toutes les pages.

## Etape 3 : Un menu pour les diriger tous !

1 - Ok, visiblement on peut créér un sous répertoire au dossier `views`, je vois sur les forum que beaucoup en créé un qui s'appel `partials`. Je pense qu'on va pas se prendre la tête à jouer les originaux hein ?
2 - Ok je pense maintenant qu'il suffit de copier la portion de code qu'on veut répéter et de la déplacer dans un template à part dans le dossier `partials`.
<details>

Il vous faut donc créer ici un template dans `partials` que vous pouvez appeler `header.ejs` et dans lequel vous pouvez copier depuis le premier template le code allant du `DOCTYPE` jusqu'à la fin de la `nav`

</details>

3 - Ok maitenant, dans notre template principal, on va inclure notre template partiel nouvellement créé tout en supprimant la portion de code dont on a plus besoin. Je reviens je vais me chercher un café. Je te laisse gérer cette partie.

Top !!! Ca fonctionne, bravo !!!!!

**BONUS** : Vous pouvez faire de même avec le footer mais il n'y a au final que deux balises à déplacer.

## Etape 4 - On s'occupe des toutous maintenant !

1 - Ok dans un premier temps, il faut qu'on intègre le module avec les données sur les chiots. Ca ne doit pas être trop éloigné de ce qu'on a fait pour express.
<details>

> Vous pouvez utiliser la fonction `require` pour récupérer un module maison. Il faut juste faire en sorte de lui passé en paramêtre le chemin relatif vers le module en question

</details>

2 - Ok maintenant on peut créer la route `/dogs` et faire en sorte qu'elle rende le template. Oui, je sais on ne l'a pas encore le template mais c'est pas grave ça. On l'ajoutera après. Ah, et il faut penser à lui envoyer le contenu du module `dogs` aussi
<details>

```js
// La fonction render permet de transmettre des données aux template sous la forme d'un objet
res.render('mon_template', {nomDansLeTemplate: maVariableDansLeFichierServeur})

// On l'abrège souvent de manière à ce que le nom dans le template soit le même que celui dans le serveur
res.render('mon_template', {maVariableDansLeFichierServeur})

```

</details>

3 - Ok, maintenant on va créé le template et on va y copier le contenu du fichier `dogs.html` du dossier `integration`.

4 - Ensuite, il faut "nétoyer" un peu le template. On peut commencer par inclure notre template partiel créé à l'étape précédente.

5 - Regarde, il y uen `div` avec la classe `cards` avec plusieurs autres div qui ont elles, la classe `card` à l'intérieur.
J'ai l'impression que chaque `card` représente un chien. Je me demande si on ne peut pas faire un truc de notre tableau de chiots qu'on vient d'envoyer depuis le fichier du serveur ? 
<details>

En effet, EJS permet de mettre en place une boucle `for ( ... of ...)` qui va parcourir une liste et vous permettre de générer des bout de code HTML.

Si menu : `const menus = ['accueil', 'contact', 'mentions légales'];`

```ejs
<ul>
    <%for(const unMenu of menus) {%>
        <li><%=unMenu%></li>
    <%}%>
<ul>

```

Vous n'avez donc plus qu'un élément HTML (dans cet exemple un `<li></li>`) dupliquer autant de fois qu'il y a de données dans la liste
 
</details>

6 - Top ! Maintenant qu'on arrive à boucler, on a plus qu'une seul `div` ayant la classe `card` qui s'auto duplique. On a plus qu'à remplacer les données à l'interieur

Euh ... tu sais faire ça toi ?
<details>

Dans l'exemple précédant on bouclait sur un un tableau de chaine de caractère et c'est la syntaxe <%=unMenu%> qui nous permet d'afficher le contenu de cette variable

Si menu : `const menus = ['accueil', 'contact', 'mentions légales'];`

```ejs
<ul>
    <%for(const unMenu of menus) {%>
        <li><%=unMenu%></li>
    <%}%>
<ul>

```

</details>


Super boulot ! On a bientôt terminé. Je te propose de finir sans moi je dois filer en réunion avec le client. Bon courage !

## BONUS : Père Toutou, compte moi une histoire

Maintenant que vous êtes arrivé jusqu'ici, vous pouvez vous lancer à l'assaut de la dernière page, celle qui permet de lire l'hitoire du chiot séléctionné.

Attention aux choses suivantes :

- L'url sera paramêtrée
- Il faudra trouver le bon chiot dans la liste avant de l'envoyer dans le template. 
- Le text est une liste de paragraphes 