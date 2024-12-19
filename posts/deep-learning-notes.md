---
title: Deep Learning深度学习-学习笔记
date: '2023-11-18 02:18:00'
thumbnail: /images/projects/deep-learning.jpg
categories:
  - 机器学习
tags:
  - 深度学习
autoSlug: false
---

> This notes' content are all based on https://www.coursera.org/specializations/deep-learning
>
> Latex may have some issues when displaying.

<!--more-->

## I. Neural Networks and Deep Learning

### 1.1 Introduction to Deep Learning

#### 1.1.1 Supervised Learning with Deep Learning

- Structured Data: Charts.
- Unstructured Data: Audio, Image, Text.

#### 1.1.2 Scale drives deep learning progress

- The larger the amount of data, the better the performance of the larger neural network compare to smaller one or supervised learning.
- Sigmoid change to ReLU will make gradient descent much more faster. Since the gradient will not go to 0 really fast.

### 1.2 Basics of Neural Network Programming

#### 1.2.1 Binary Classification

- Input: $X \in R^{nx} $
- Output: 0, 1

#### 1.2.2 Logistic Regression

- Given $x$, want $\hat{y} = P(y=1|x)$

- Input: $x \in R^{n_x} $

- Parameters: $w \in R^{n_x}, b \in R $

- Output $\hat{y} = \sigma(w^Tx + b)$

  - $\sigma(z)=\dfrac{1}{1+e^{-z}}$
  - If $z $ large, $\sigma(z)\approx\dfrac{1}{1+0}\approx1$
  - If $z $ large negative number, $\sigma(z)\approx\dfrac{1}{1+Bignum}\approx0$

- Loss (error) function:

  - $\hat{y} = \sigma(w^Tx + b)$, where $\sigma(z)=\dfrac{1}{1+e^{-z}}$

    - $z^{(i)}=w^Tx^{(i)}+b$

  - Want $y^{(i)} \approx \hat{y}^{(i)} $

  - $L(y, \hat{y}) = -[y \log(\hat{y}) + (1 - y) \log(1 - \hat{y})]$

    - If $y=1: L(\hat{y}, y)=-\log{\hat{y}} $ <- want $\log{\hat{y}}$ as large as possible, want $\hat{y}$ large
    - If $y=0: L(\hat{y}, y)=-\log{(1-\hat{y})} $ <- want $\log{(1-\hat{y})}$ as large as possible, want $\hat{y}$ small

- Cost function

  - $J(w, b)=\dfrac{1}{m}\sum\limits_{i=1}^{m}L(\hat{y}^{(i)},y^{(i)})=-\dfrac{1}{m}\sum\limits_{i=1}^{m}L[y^{(i)} \log(\hat{y}^{(i)}) + (1 - y^{(i)}) \log(1 - \hat{y}^{(i)})]$

#### 1.2.3 Gradient Descent

- Repeat $w:=w-\alpha\dfrac{dJ(w)}{dw}$; $b:=b-\alpha\dfrac{\partial J(w,b)}{\partial b}$
  - $\alpha$: Learning rate
  - Right side of minimum, $\dfrac{dJ(w)}{dw} > 0$; Left side of minimum, $\dfrac{dJ(w)}{dw} < 0$
- Logistic Regression Gradient Descent
  - $x_1,x_2,w_1,w_2,b$
    - $z=w_1x_1+w_2x_2+b$ -->$a=\sigma(z)$ -->$L=(a,y)$
    - $da=\dfrac{dL(a,y)}{da}=-\dfrac{y}{a}+\dfrac{1-y}{1-a}$
      - $\dfrac{dL(y,a)}{da} = \dfrac{d}{da}(-y\log(a) - (1-y)\log(1-a))$
      - $\dfrac{d}{da} (-y\log(a)) = -\dfrac{y}{a}$
      - $\dfrac{d}{da} (-(1-y)\log(1-a)) = -\dfrac{1-y}{1-a} \times (-1) = \dfrac{1-y}{1-a} $
      - $=-\dfrac{y}{a} + \dfrac{1-y}{1-a} = -\dfrac{y}{a} - \dfrac{y-1}{1-a}$
    - $dz=\dfrac{dL}{dz}=\dfrac{dL(a,y)}{dz}=a-y$
      - $=\dfrac{dL}{da}\cdot\dfrac{da}{dz}$ ($\dfrac{da}{dz}=a(1-a)$)
    - $\dfrac{dL}{dw_1}="dw_1"=x_1\cdot dz$
    - $\dfrac{dL}{dw_2}="dw_2"=x_2\cdot dz$
    - $db=dz$
- Gradient Descent on $m$ examples
  - $J(w, b)=\dfrac{1}{m}\sum\limits_{i=1}^{m}L(a^{(i)},y^{(i)})$
  - $\dfrac{\partial}{\partial w_1}J(w,b)=\dfrac{1}{m}\sum\limits_{i=1}^{m}\dfrac{\partial}{\partial w_1}L(a^{(i)},y^{(i)})$
  - $J=0;dw_1=0;dw_2=0;db=0$
    - for $i=1$ to $m$
      - $z^{(i)}=w^Tx^{(i)}+b$
      - $a^{(i)}=\sigma (z^{(i)})$
      - $J+=-[y^{(i)}loga^{(i)}+(1-y^{(i)})log(1-a^{(i)})]$
      - $dz^{(i)}=a^{(i)}-y^{(i)}$
      - $dw_1+=x_1^{(i)}dz^{(i)}$ (for n = 2)
      - $dw_2+=x_2^{(i)}dz^{(i)}$ (for n = 2)
      - $db+=dz^{(i)}$
    - $J/=m;dw_1/=m;dw_2/=m;db/=m$
    - $dw_1=\dfrac{\partial J}{\partial w_1}; dw_2=\dfrac{\partial J}{\partial w_2}$
      - $w_1:=w_1-\alpha dw_1$
      - $w_2:=w_2-\alpha dw_2$
      - $b:=b-\alpha db$

#### 1.2.4 Computational Graph

- $J(a,b,c)=3(a+bc)$

  - $u=bc$
  - $v=a+u$
  - $J=3v$
  - Left to right computation

- Derivatives with a Computation Graph

  - $\dfrac{dJ}{dv}=3$
    - $\dfrac{dJ}{da}=3$
    - $\dfrac{dv}{da}=1$
    - Chain Rule: $\dfrac{dJ}{da}=\dfrac{dJ}{dv}\cdot\dfrac{dv}{da}$
    - $\dfrac{dJ}{du}=3; \dfrac{du}{db}=2; \dfrac{dJ}{db}=6$
    - $\dfrac{du}{dc}=3; \dfrac{dJ}{dc}=9$

#### 1.2.5 Vectorization

- avoid explicit for-loops.

- $J=0;dw=np.zeros((n_x,1));db=0$

  - for $i=1$ to $m$
    - $z^{(i)}=w^Tx^{(i)}+b$
    - $a^{(i)}=\sigma (z^{(i)})$
    - $J+=-[y^{(i)}loga^{(i)}+(1-y^{(i)})log(1-a^{(i)})]$
    - $dz^{(i)}=a^{(i)}-y^{(i)}$
    - $dw+=x^{(i)}dz^{(i)}$
    - $db+=dz^{(i)}$
  - $J/=m;dw/=m;db/=m$

- $Z=np.dot(w.T,x)+b$ ; b(1,1)-->Broodcasting

- Vectorization Logistic Regression

  - $dz^{(1)}=a^{(1)}-y^{(1)}; dz^{(2)}=a^{(2)}-y^{(2)}...$
  - $dz=[dz^{(1)}, dz^{(2)},...,dz^{(m)}]$ $1\times m$
  - $A=[a^{(1)}, a^{(2)}, ..., a^{(m)}]$ $Y=[y^{(1)}, y^{(2)}, ..., y^{(m)}]$
  - $dz=A-Y=[a^{(1)}-y^{(1)}, a^{(2)}-y^{(2)}, ...]$
  - Get rid of $db$ and $dw$ in for loop
    - $db=\dfrac{1}{m}\sum\limits_{i=1}^{m}dz^{(i)}=\dfrac{1}{m} np.sum(dz)$
    - $dw=\dfrac{1}{m}\cdot X\cdot dz^T=\dfrac{1}{m}[x^{(1)}...][dz^{(1)}...]=\dfrac{1}{m}\cdot[x^{(1)}dz^{(1)}+...+x^{(m)}dz^{(m)}]$ $n\times 1$
  - New Form of Logistic Regression
    - $Z=w^tX+b=np.dot(w.T, X)+b$
    - $A=\sigma (Z)$
    - $dz=A-Y$
    - $dw=\dfrac{1}{m}\cdot X \cdot dZ^T$
    - $db=\dfrac{1}{m}np.sum(dz)$
    - $w:=w-\alpha dw$
    - $b:=b-\alpha db$

- Broadcasting(same as bsxfun in Matlab/Octave)

  - $(m,n)$+-\*/$(1,n)$->$(m,n)$ 1->m will be all the same number.
  - $(m,n)$+-\*/$(m,1)$->$(m,n)$ 1->n will be all the same number
  - Don't use $a = np.random.randn(5)$ $a.shape = (5,)$ "rank 1 array"
  - Use $a = np.random.randn(5,1)$ or $a = np.random.randn(1,5)$
  - Check by $assert(a.shape == (5,1))$
  - Fix rank 1 array by $a = a.reshape((5,1))$

- Logistic Regression Cost Function

  - Lost
    - $p(y|x)=\hat{y}^y(1-\hat{y})^{(1-y)}$
    - If $y=1$: $p(y|x)=\hat{y}$
    - If $y=0$: $p(y|x)=(1-\hat{y})$
    - $\log p(y|x)=\log \hat{y}^y(1-\hat{y})^{(1-y)}=y\log \hat{y}+(1-y)\log(1-\hat{y})=-L(\hat{y},y)$
  - Cost
    - $\log p(labels\space in\space training\space set)=\log \Pi_{i=1}^{m}p(y^{(i)},x^{(i)})$
    - $\log p(labels\space in\space training\space set)=\sum\limits_{i=1}^m\log p(y^{(i)},x^{(i)})=-\sum\limits_{i=1}^mL(\hat{y}^{(i)},y^{(i)})$
    - Use maximum likelihood estimation(MLE)
    - Cost(minmize): $J(w,b)=\dfrac{1}{m}\sum\limits_{i=1}^mL(\hat{y}^{(i)},y^{(i)})$

### 1.3 Shallow Neural Networks

#### 1.3.1 Neural Network Representation

- ![deep-learning-notes_1-3-1](https://s2.loli.net/2023/11/20/EHtqxOI6c5NQuG8.jpg)

- Input layer, hidden layer, output layer

  - $a^{[0]}=x$ -> $a^{[1]}=[[a^{[1]}_1,a^{[1]}_2,a^{[1]}_3,a^{[1]}_4]]$ -> $a^{[2]}$
  - Layers count by # of hidden layer+# of output layer.

- $x_1,x_2,x_3$ -> $4\space hidden\space nodes$ -> $Output\space layer$

  - First hidden node: $z^{[1]}_1=w^{[1]T}_1+b^{[1]}_1, a^{[1]}_1=\sigma(z^{[1]}_1)$
  - Seconde hidden node: $z^{[1]}_2=w^{[1]T}_2+b^{[1]}_2, a^{[1]}_2=\sigma(z^{[1]}_2)$
  - Third hidden node: $z^{[1]}_3=w^{[1]T}_3+b^{[1]}_3, a^{[1]}_3=\sigma(z^{[1]}_3)$
  - Forth hidden node: $z^{[1]}_4=w^{[1]T}_4+b^{[1]}_4, a^{[1]}_4=\sigma(z^{[1]}_4)$

- Vectorization

  - $w^{[1]}=\begin{gathered}\begin{bmatrix}-w^{[1]T}_1- \\ -w^{[1]T}_2- \\ -w^{[1]T}_3- \\ -w^{[1]T}_4- \end{bmatrix}\end{gathered} (4,3)matrix$
  - $z^{[1]}=\begin{gathered}\begin{bmatrix}-w^{[1]T}_1- \\ -w^{[1]T}_2- \\ -w^{[1]T}_3- \\ -w^{[1]T}_4- \end{bmatrix}\end{gathered}\cdot \begin{gathered}\begin{bmatrix}x_1 \\ x_2 \\ x_3 \end{bmatrix}\end{gathered} + \begin{gathered}\begin{bmatrix}b^{[1]}_1 \\ b^{[1]}_2 \\b^{[1]}_3 \\ b^{[1]}_4 \end{bmatrix}\end{gathered} =\begin{gathered}\begin{bmatrix}w^{[1]T}_1\cdot x+b^{[1]}_1 \\ w^{[1]T}_2\cdot x+b^{[1]}_2 \\ w^{[1]T}_3\cdot x++b^{[1]}_3 \\ w^{[1]T}_4\cdot x+b^{[1]}_4 \end{bmatrix}\end{gathered}=\begin{gathered}\begin{bmatrix}z^{[1]}_1 \\ z^{[1]}_2 \\z^{[1]}_3 \\ z^{[1]}_4 \end{bmatrix}\end{gathered}$
  - $a^{[1]}=\begin{gathered}\begin{bmatrix}a^{[1]}_1 \\ a^{[1]}_2 \\a^{[1]}_3 \\ a^{[1]}_4 \end{bmatrix}\end{gathered}=\sigma(z^{[1]})$
  - $z^{[2]}=W^{[2]}\cdot a^{[1]}+b^{[2]}$ $(1, 1),(1, 4),(4, 1),(1, 1)$
  - $a^{[2]}=\sigma(z^{[2]})$ $(1,1),(1,1)$
  - $a^{[2](i)}$: layer $2$; example $i$

- for i=1 to m:

  - $z^{[1](i)}=W^{[1]}\cdot x(i)+b^{[1]}$
  - $a^{[1](i)}=\sigma(z^{[1](i)})$
  - $z^{[2](i)}=W^{[2]}\cdot a^{[1](i)}+b^{[2]}$
  - $a^{[2](i)}=\sigma(z^{[2](i)})$

- Vectorizing of the above for loop

  - $X=\begin{gathered}\begin{bmatrix}| & | & | & | \\ x^{(1)}, &  x^{(2)}, & ..., & x^{(m)} \\ | & | & | & |\end{bmatrix}\end{gathered} (n_x,m)matrix$ n is different hidden units
  - $Z^{[1]}=W^{[1]}\cdot X+b^{[1]}$
  - $A^{[1]}=\sigma(Z^{[1]})$
  - $Z^{[2]}=W^{[2]}\cdot A^{[1]}+b^{[2]}$
  - $A^{[2]}=\sigma(Z^{[2]})$
  - hrizontally: training examples; vertically: hidden units

#### 1.3.2 Activation Functions

- $g^{[i]}$: activation function of layer $i$

  - Sigmoid: $a=\dfrac{1}{1+e^{[-z]}}$
  - Tanh: $a=\dfrac{e^z-e^{[-z]}}{e^z+e^{[-z]}}$
  - ReLU: $a=max(0,z)$
  - Leaky ReLu: $a=max(0.01z, z)$

- Rules to choose activation function

  1. Output is between {0, 1}, choose sigmoid.
  2. Default choose ReLu.

- Why need non-liner activation function

  - Use linear hidden layer will be useless to have multiple hidden layers. It will become $a=w'x+b'$.
  - Linear may sometime use at output layer but with non-linear at hidden layers.

#### 1.3.3 Forward and Backward Propogation

- Derivative of activation function

  - Sigmoid: $g'(z)=\dfrac{d}{dz}g(z)=\dfrac{1}{1+e^{[-z]}}(1-\dfrac{1}{1+e^{[-z]}})=g(z)(1-g(z))=a(1-a)$
  - Tanh: $g'(z)=\dfrac{d}{dz}g(z)=1-(tanh(z))^2$
  - ReLU: $g'(z)=\left\{\begin{array}{lr}0&if \space z<0 \\1&if \space z\geq0\\\usepackage{undefined}&\usepackage{if \space z=0}\end{array}\right.$
  - Leaky ReLU: $g'(z)=\left\{\begin{array}{lr}0.01&if \space z<0 \\1&if \space z\geq0\end{array}\right.$

- Gradient descent for neural networks

  - Parameters: $w^{[1]}(n^{[1]},n^{[2]}), b^{[1]}(n^{[2]},1),w^{[2]}(n^{[2]},n^{[1]}), b^{[2]}(n^{[2]},1)$
  - $n_x=n^{[0]},n^{[1]},n^{[2]}=1$
  - Cost function: $J(w^{[1]}, b^{[1]},w^{[2]}, b^{[2]})=\dfrac{1}{m}\sum\limits_{i=1}^nL(\hat{y},y)$

- Forward propagation:

  - $Z^{[1]}=W^{[1]}\cdot X+b^{[1]}$
  - $A^{[1]}=g^{[1]}(Z^{[1]})$
  - $Z^{[2]}=W^{[2]}\cdot A^{[1]}+b^{[2]}$
  - $A^{[2]}=g^{[2]}(Z^{[2]})=\sigma(Z^{[2]})$

- Back Propogation:

  - $dZ^{[2]}=A^{[2]}-Y$ $Y=[y^{(1)},y^{(2)},...,y^{(m)}]$

  - $dW^{[2]}=\dfrac{1}{m}dZ^{[2]}A^{[1]T}$

  - $db^{[2]}=\dfrac{1}{m}np.sum(dZ^{[2]},axis=1,keepdims=True)$

  - $dZ^{[1]}=W^{[2]T}dZ^{[2]}*g'^{[1]}(Z^{1})$

    - $(n^{[1]},m)->element-wise\space product->(n^{[1]},m)$

  - $dW^{[1]}=\dfrac{1}{m}dZ^{[1]}X^{T}$

  - $db^{[1]}=\dfrac{1}{m}np.sum(dZ^{[1]},axis=1,keepdims=True)$

- Random Initialization

  - $x_1,x_2->a_1^{[1]},a_2^{[1]}->a_1^{[2]}->\hat{y}$
  - $w^{[1]}=np.random.randn((2,2))*0.01$
  - $b^{[1]}=np.zeros((2,1))$
  - $w^{[2]}=np.random.randn((1,2))*0.01$
  - $b^{[2]}=0$

### 1.4 Deep Neural Networks

#### 1.4.1 Deep L-Layer Neural Network

- Deep neural network notation
  - ![deep-learning-notes_1-4-1](https://s2.loli.net/2023/11/20/9w2GKxylSrjfoFq.jpg)
  - $L=4$ (#layers)
  - $n^{[l]}= \#\space units\space in\space layer\space l $
    - $n^{[1]}=5,n^{[2]}=5,n^{[3]}=3,n^{[4]}=n^{[l]}=1$
    - $n^{[0]}=n_x=3$
  - $a^{[l]}=activations\space in\space layer\space l$
  - $a^{[l]}=g^{[l]}(z^{[l]}),\space w^{[l]}=weights\space for\space z^{[l]},\space b^{[l]}=bias\space for\space z^{[l]}$
  - $x=a^{[0]},\space \hat{y}=a^{l}$

#### 1.4.2 Forward Propagation in a Deep Network

- General: $Z^{[l]}=w^{[l]}A^{[l-1]}+b^{[l]}, A^{[l]}=g^{[l]}(Z^{[l]})$

  - $x: z^{[1]}=w^{[1]}a^{[0]}+b^{[1]}, a^{[1]}=g^{[1]}(z^{[1]})$ $a^{[0]}=X$
  - $z^{[2]}=w^{[2]}a^{[1]}+b^{[2]}, a^{[1]}=g^{[2]}(z^{[2]})$
  - ...
  - $z^{[4]}=w^{[4]}a^{[3]}+b^{[4]}, a^{[4]}=g^{[4]}(z^{[4]})=\hat{y}$

- Vectorizing:

  - $Z^{[1]}=w^{[1]}A^{[0]}+b^{[1]}, A^{[1]}=g^{[1]}(Z^{[1]})$ $A^{[0]}=X$
  - $Z^{[2]}=w^{[2]}A^{[1]}+b^{[2]}, A^{[2]}=g^{[2]}(Z^{[2]})$
  - $\hat{Y}=g(Z^{[4]})=A^{[4]}$

- Matrix dimensions

  - ![deep-learning-notes_1-4-2](https://s2.loli.net/2023/11/20/a6emOyncIbRlo8w.jpg)
  - $z^{[1]}=w^{[1]}\cdot x+b^{[1]}$
  - $z^{[1]}=(3,1),w^{[1]}=(3,2),x=(2,1),b^{[1]}=(3,1)$
  - $z^{[1]}=(n^{[1]},1),w^{[1]}=(n^{[1]},n^{[0]}),x=(n^{[0]},1),b^{[1]}=(n^{[1]},1)$
  - $w^{[l]}/dw^{[l]}=(n^{[l]},n^{[l-1]}),b^{[l]}/db^{[l]}=(n^{[l]},1)$
  - $z^{[l]},a^{[l]}=(n^{[l]},1),Z^{[l]}/dZ^{[l]},A^{[l]}/dA^{[l]}=(n^{[l]},1)$ $l=0, A^{[0]}=X=(n^{[0]},m)$

- Why deep representation?

  - Earier layers learn simple features; later deeper layers put together to detect more complex things.
  - Circuit theory and deep learning: Informally: There are functions you can compute with a "small" L-layer deep neural network that shallower networks require exponentially more hidden units to compute.

#### 1.4.3 Building Blocks of Deep Neural Networks

- Forward and backward functions

  - ![deep-learning-notes_1-4-3](https://s2.loli.net/2023/11/20/PBfq6ISu2h8vKeV.jpg)
  - Layer $l:w^{[l]},b^{[l]}$
  - Forward: Input $a^{[l-1]}$, output $a^{[l]}$
    - $z^{[l]}:w^{[l]}a^{[l-1]}+b^{[l]}$ $cache\space z^{[l]}$
    - $a^{[l]}:g^{[l]}(z^{[l]})$
  - Backward: Input $da^{[l]}, cache(z^{[l]})$, output $da^{[l-1]},dw^{[l]},db^{[l]}$

- One iteration of gradient descent of neural network

  - ![deep-learning-notes_1-4-3-2](https://s2.loli.net/2023/11/20/35UIkJnmlSHt82j.jpg)

- How to implement?

  - Forward propagation for layer $l$

    - Input $a^{[l-1]}$, output $a^{[l]},cache\space (z^{[l]})$

      - $z^{[l]}=w^{[l]}a^{[l-1]}+b^{[l]}$
      - $a^{[l]}=g^{[l]}(z^{[l]})$

    - Vectoried

      - $Z^{[l]}=W^{[l]}A^{[l-1]}+b^{[l]}$
      - $A^{[l]}=g^{[l]}(Z^{[l]})$

  - Backward propagation for layer $l$

    - Input $da^{[l]}, cache(z^{[l]})$, output $da^{[l-1]},dw^{[l]},db^{[l]}$

      - $dz^{[l]}=da^{[l]}*g'^{[l]}(z^{[l]})$
      - $dw^{[l]}=dz^{[l]}\cdot a^{[l-1]}$
      - $db^{[l]}=dz^{[l]}$
      - $da^{[l-1]}=w^{[l]T}\cdot dz^{[l]}$

    - Vectorized:

      - $dZ^{[l]}=dA^{[l]}*g'^{[l]}(Z^{[l]})$
      - $dW^{[l]}=\dfrac{1}{m}dZ^{[l]}A^{[l-1]T}$
      - $db^{[l]}=\dfrac{1}{m}np.sum(dZ^{[l]},axis=1,keepdims=True)$
      - $dA^{[l-1]}=W^{[l]T}\cdot dZ^{[l]}$

#### 1.4.4 Parameters vs. Hyperparameters

- Parameters: $W^{[1]}, b^{[1]}, W^{[2]}, b^{[2]},...$

- Hyperparameters (will affect/control/determine parameters):

  - learning rate $\alpha$
  - \# iterations
  - \# of hidden units $n^{[1]},n^{[2]},...$
  - \# of hidden layers
  - Choice of activation function

- Later: momemtum, minibatch size, regularization parameters,...

## II. Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization

### 2.1 Practical Aspects of Deep Learning

#### 2.1.1 Train / Dev / Test sets

- Big data may need only 1% or even less dev/test sets.
- Mismatched: Make sure dev/test come from same distribution
- Not having a test set might be okay. (Only dev set.)

#### 2.1.2 Bias / Variance

![deep-learning-notes_2-1-2](https://s2.loli.net/2023/11/21/ROywuJQ3dNzfhBo.jpg)

![deep-learning-notes_2-1-2-2](https://s2.loli.net/2023/11/21/S4cZ3Aua8es7WfG.jpg)

- Assume optimal (Bayes) error: $\approx0\%$
- High bias (underfitting): The prediction cannot classify different elemets as we want.
  - Training set error $15\%$, Dev set error $16\%$.
  - Training set error $15\%$, Dev set error $30\%$.
- "just right": The prediction perfectly classify different elemets as we want.
  - Training set error $0.5\%$, Dev set error $1\%$.
- High variance (overfitting): The prediction 100% classify different elemets.
  - Training set error $1\%$, Dev set error $11\%$.
  - Training set error $15\%$, Dev set error $30\%$.

#### 2.1.3 Basic Recipe for Machine Learning

##### 2.1.3.1 Basic Recipe

- High bias(training data performance)
  - Bigger network
  - Train longer
  - (NN architecture search)
- High variance (dev set performance)
  - More data
  - Regulairzation
  - (NN architecture search)

##### 2.1.3.2 Regularization

- Logistic regression. $\min\limits_{w,b}J(w,b)$
  - $w\in\mathbb{R}^{n_x}, b\in\mathbb{R}$
  - $\lambda=regularization\space parameter$
  - $J(w,b)=\dfrac{1}{m}\sum\limits_{i=1}^mL(\hat{y}^{(i)},y^{(i)})+\dfrac{\lambda}{2m}||w^2||_2$
  - L2 regularization $||w^2||_2=\sum\limits_{j=1}^{n_x}w_j^2=w^Tw$
  - L1 regularization $\dfrac{\lambda}{2m}\sum\limits_{j=1}^{n_x}|w_j|=\dfrac{\lambda}{2m}||w||_1$
    - $w$ will be spouse(for L1) (will have lots of 0 in it, only help a little bit)
- Neural network
  - $J(w^{[1]},b^{[1]},...,w^{[l]},b^{[l]})=\dfrac{1}{m}\sum\limits_{i=1}^{m}L(\hat{y}^{(i)},y^{(i)})+\dfrac{\lambda}{2m}\sum\limits_{l=1}^{l}||w^2||_F$
  - $||w^{[l]}||_F^2=\sum\limits_{i=1}^{n^{[l-1]}}\sum\limits_{j=1}^{n^{[l]}}(w_{ij}^{[l]})^2$ $w: (w^{[l]},w^{[l-1]})$
    - Frobenius norm: Square root of square sum of all elements in a matrix.
  - $dw^{[l]}=(from\space backprop)+\dfrac{\lambda}{m}w^{[l]}$
    - $w^{[l]}:=w^{[l]}-\alpha dw^{[l]}$ (keep the same)
    - Weight decay
      - $w^{[l]}:=w^{[l]}-\alpha[(from\space backprop)+\dfrac{\lambda}{m}w^{[l]}]$
      - ​ $=w^{[l]}-\dfrac{\alpha\lambda}{m}w^{[l]}-\alpha(from\space backprop)$
      - ​ $=(1-\dfrac{\alpha\lambda}{m})w^{[l]}-\alpha(from\space backprop)$
- How does regularization prevent overfitting: $\lambda$ bigger $w^{[l]}$ smaller $z^{[l]}$ smaller, which will make the activation function nearly linear(take tanh as an example). This will cause the network really hard to draw boundary with curve.
- Dropout regularization
  - ![deep-learning-notes_2-1-3-2](https://s2.loli.net/2023/11/21/WTqeEg4MDPbtK12.jpg)
  - Implementing dropout("Inverted dropout")
    - Illustrate with layer $l=3$ $keep-prob=0.8$ (means 0.2 chance get dropout/be 0 out)
    - $d3 = np.random.rand(a3.shape[0],a3.shape[1]) < keep-prob$ #This will set d3 to be a same shape matrix as a3 with True (1), False (0) value.
    - $a3 = np.multiply(a3, d3)$ #a3\*=d3; This will let some neruons been dropout
    - $a3/=keep-prob$ #inverted dropout, keep the total avtivation the same before and after dropout.
  - Why work: Can't rely on any one feature, so have to spread out weights.(shrink weights)
  - First make sure the J is decreasing during iteration, then turn on dropout.
- Data augmentation
  - Image: crop, flop, twist...
- Early stopping
  - Mid-size $||w||_F^2$
  - May caused optimize cost function and not overfir at the same time.
- Orthogonalization
  - Only consider optimize cost function or consider not overfit at one time.

##### 2.1.3.3 Setting up your optimization problem

- Normalizing training sets
  - ![deep-learning-notes_2-1-3-3](https://s2.loli.net/2023/11/21/jtT9fC5nw2R7xqo.jpg)
  - $x=\begin{gathered}\begin{bmatrix}x_1 \\ x_2\end{bmatrix}\end{gathered}$
  - Subtract mean:
    - $\mu=\dfrac{1}{m}\sum\limits_{i=1}^{m}x^{(i)}$
    - $x:=x-\mu$
  - Normalize variance:
    - $\sigma^2=\dfrac{1}{m}\sum\limits_{i=1}^{m}x^{(i)}**2$ "\*\*" element-wise
    - $x/=\sigma^2$
  - Use same $\mu,\sigma^2$ to normalize test set.
  - Why normalize inputs?
    - When inputs in very different scales will help a lot for performance and gradient descent/learning rate.
    - ![deep-learning-notes_2-1-3-3-2](https://s2.loli.net/2023/11/21/MW7wNCXahR3FZx9.jpg)
- Vanishing/exploding gradients
  - $w^{[l]}>I$ Just slightly, will make the gradient increase really fast (exploding).
  - $w^{[l]}<I$ Just slightly, will make the gradient decrease really slow (varnishing).
- Weight initalization (Single neuron)
  - large $n$ (number of input features) --> smaller $w_i$
  - $Variance(w:)=\dfrac{1}{n}$ (sigmoid/tanh) ReLU: $\dfrac{2}{n}$ (variance can be a hyperparameter, DO NOT DO THAT)
  - $w^{[l]}=np.random.randn(shapeOfMatrix)*np.sqrt(\dfrac{1}{n^{[l-1]}})$ ReLU: $\dfrac{2}{n^{[l-1]}}$
  - Xavier initialization: $\sqrt{\dfrac{1}{n^{[l-1]}})}$ Sometime $\sqrt{\dfrac{2}{n^{[l-1]}+n^{[l]}})}$
- Numerical approximation of gradients
  - $\dfrac{f(\theta+\epsilon)-f(\theta-\epsilon)}{2\epsilon}$
- Gradient checking (Grad check)
  - Take $W^{[1]},b^{[1]},...,W^{[L]},b^{[L]}$ and reshape into a big vector $\theta$.
  - Take $dW^{[1]},db^{[1]},...,dW^{[L]},db^{[L]}$ and reshape into a big vector $d\theta$.
  - for each i:
    - $d\theta_{approx}[i]=\dfrac{J(\theta_1,\theta_2,...,\theta_i+\epsilon,...)-J(\theta_1,\theta_2,...,\theta_i-\epsilon,...)}{2\epsilon}\approx d\theta[i]=\dfrac{\partial J}{\partial \theta_i}$
    - Check Euclidean distance $\dfrac{||d\theta_{approx}-d\theta||_2}{||d\theta_{approx}||_2+||d\theta||_2}$ ($||.||_2$ is Euclidean norm, sqare root of the sum of all elements' power of 2)
    - take $\epsilon=10^{-7}$, if above Euclidean distance is $\approx10^{-7}$ or smaller, is great.
    - If is $10^{-5}$ or bigger may need to check.
    - If is $10^{-3}$ or bigger may need to worry, maybe a bug. Check which i approx is difference between the real value.
  - notes:
    - Don't use in training - only to debug.
    - If algorithm fails grad check, look at components to try to identify bug.
    - Remember regularization. (include the $\dfrac{\lambda}{2m}$)
    - Doesn't work with dropout. (since is random, implement without dropout)
    - Run at random initialization; perhaps again after some training. (not work when $w,b\approx0$)

### 2.2 Optimization Algorithms

#### 2.2.1 Mini-batch gradient descent

- Batch vs. mini-batch gradient descent
  - Normal batch may have large amount of data like millions of elements.
    - set $m=5,000,000$
    - $X=[x^{(1)},x^{(2)},x^{(3)},...,x^{(1000)},x^{(1001)},...,x^{(2000)},...,x^{(m)}] (n_x,m)$
    - $Y=[y^{(1)},y^{(2)},y^{(3)},...,y^{(m)}] (1,m)$
  - Mini-batches make 1,000 $x$ each.
    - Mini-batch number $t:X^{\{t\}},Y^{\{t\}}$
      - $x^{(i)}$ ith in trainning set, $z^{[l]}$ layer in network $X^{\{t\}}$ batch in mini-batch
    - $X = [X^{\{1\}},X^{\{2\}},...,X^{\{5000\}}]$
    - $Y=[Y^{\{1\}},Y^{\{2\}},Y^{\{3\}},...,Y^{(5,000)}]$
- Mini-batch gradient descent
  - 1 step of gradient descent using $X^{\{t\}},Y^{\{t\}}$ (1000)
    - 1 epoch: single pass through training set.
  - $for\space t=1,...,5000$
    - Forward prop on $X^{\{t\}}$
    - $Z^{[1]}=W^{[1]}X^{\{t\}}+b^{[1]}$
    - $A^{[1]}=g^{[1]}(Z^{[1]})$
    - ...
    - $A^{[l]}=g^{[l]}(Z^{[l]})$
  - Compute cost $J^{\{t\}}=\dfrac{1}{1000}\sum\limits_{i=1}^{l}L(\hat{y}^{(i)},y^{(i)})+\dfrac{\lambda}{2\cdot1000}\sum\limits_{l=1}^{l}||w^{[l]}||_F^2$
    - $\hat{y}^{(i)},y^{(i)}$ --> from $X^{\{t\}},Y^{\{t\}}$
  - Backprop to compute gradient cost $J^{\{t\}}\space (using\space (X^{\{t\}},Y^{\{t\}}))$
  - $w^{[l]}:=w^{[l]}-\alpha dw^{[l]}, b^{[l]}:=b^{[l]}-\alpha db^{[l]}$
- Understanding mini-batch gradient descent
  - ![deep-learning-notes_2-2-1](https://s2.loli.net/2023/11/22/4yOYlp2bcEtPSuw.jpg)
  - If mini-batch size=m:batch gradient descent (Too long per iteration).--$(X^{\{t\}},Y^{\{t\}})=(X,Y)$
  - If mini-batch size=1:Stochatic gradient descent (noisy, not converge, loos speedup from vectorization).-- Every example is it own mini-batch.
  - In practice: select in-between 1 and m.
    - Get lots of vectorization
    - Make progress without needing to wait entire training set.
- Choosing mini-batch size
  - No need for small training set ($m<2000$)
  - Typical mini-batch size: 64, 128, 256, 512. (Use power of 2)
  - Make sure minibatch fir in CPU/GPU memory.

#### 2.2.2 Exponentially weighted averages

- $V_t = \beta V_{t-1} + (1 - \beta) \theta_t$

  - $V_t$ is the weighted average at time $t$.
  - $\theta_t$ is the actual observed value at time $t$.
  - $\beta$ is the decay rate (usually between 0 and 1).
  - $V_{t-1}$ is the weighted average at the previous time step.

- Impact of Decay Rate $\beta$: The value of $\beta$ significantly affects the smoothness of the weighted average curve:

  - A larger $\beta$ makes the curve smoother, as it gives more weight to past observations, thereby reducing the impact of recent changes on the weighted average.
  - A smaller $\beta$ makes the curve more responsive to recent changes, as it gives more weight to recent observations.

- Interpretation of $\dfrac{(1-\epsilon)^{\frac{1}{\epsilon}}}{\text{some constant}} = \dfrac{1}{e}$

  - Defining $\epsilon$ as $1 - \beta$ provides insight into how the influence of past data gradually diminishes as $\beta$ approaches 1 (i.e., $\epsilon$ approaches 0).
  - As $\epsilon$ approaches 0, $(1-\epsilon)^{\frac{1}{\epsilon}}$ approaches $ \dfrac{1}{e}$, indicating that even though past data is given more weight (high $ \beta$), its actual impact on the current value is decreasing.

- Implementation

  - $v_{\theta}:=0$
  - Repear for each day:
    - Get the next $\theta_t$
    - $v_\theta:=\beta v_\theta+(1-\beta)\theta_t$

- Bias correction in exponentially weighted averages

  - Bias correction is applied to counteract the initial bias in exponentially weighted averages, especially when the number of data points is small or at the start of the calculation.
  - $\dfrac{v_t}{1-\beta^t}$ Here, $v_t $ is the uncorrected exponentially weighted average at time $t$, and $\beta$ is the decay rate.
  - It ensures that the moving averages are not underestimated, particularly when $\beta$ is high and in the early stages of the iteration. With iteration goes on, the affect of this correction will become smaller since $\beta^t$ is closer to 1.

- Gradient descent with momentum

  - On iteration t:
    - Compute $dw, db$ on current mini-batch (whole batch if not using mini-batch)
    - $v_{dw}=\beta v_{dw}+(1-\beta)dw$
    - $v_{db}=\beta v_{db}+(1-\beta)db$
    - $w:=w-\alpha v_{dw}, b:=b-\alpha v_{db}$
  - initiate $v_{dw}\space and\space v_{db} = 0$
  - Smooth out gradient descent
    - The momentum term $v$ effectively provides a smoothing effect since it is an average of past gradients. This means that extreme gradient changes in a single iteration are averaged out, reducing the volatility of the update steps.
    - This smoothing effect is particularly useful on loss function surfaces that are not flat or have many local minima.
  - Consider set $\beta$ as $0.9$ (common, about the average last 10 gradients), it gives more weight to $v_{dw}$, consider $dw$ as the acceleration. With $beta$ decreasing, velocity increasing slower and acceleration increasing faster.

#### 2.2.3 RMSprop and Adam optimization

- RMSprop (Root Mean Square Propagation)
  - On iteration t:
    - Compute $dw, db$ on current mini-batch
    - $s_{dw}=\beta_2 s_{dw}+(1-\beta_2)dw^2$ Hope to be relative small.
    - $s_{db}=\beta_2 s_{db}+(1-\beta_2)db^2$ Hope to be relative large.
    - $w:=w-\alpha\dfrac{dw}{\sqrt{s_{dw}}+\epsilon}, b:=b-\alpha\dfrac{db}{\sqrt{s_{db}}+\epsilon}$ $\epsilon$ is a realative small number($10^{-8}$) ot prevent nominaotr being 0.
  - Slow down in vertical direction, fast in horizontal direction.
- Adam (Adaptive moment estimation) optimization algorithm
  - $v_{dw}=0, s_{dw}=0. v_{db}=0, s_{dw}=0$
  - On iteration t:
    - Compute $dw, bd$ using current mini-batch
    - $v_{dw}=\beta_1v_{dw}+(1-\beta_1)dw,v_{db}=\beta_1v_{db}+(1-\beta_1)db$
    - $s_{dw}=\beta_2s_{dw}+(1-\beta_2)dw^2,s_{db}=\beta_2s_{db}+(1-\beta_2)db$
    - $v_{dw}^{corrected}=\dfrac{v_{dw}}{1-\beta_1^t}, v_{db}^{corrected}=\dfrac{v_{db}}{1-\beta_1^t}$
    - $s_{dw}^{corrected}=\dfrac{s_{dw}}{1-\beta_2^t}, s_{db}^{corrected}=\dfrac{s_{db}}{1-\beta_s^t}$
    - $w:=w-\alpha\dfrac{v_{dw}^{corrected}}{\sqrt{s_{dw}^{corrected}}+\epsilon}, b:=b-\alpha\dfrac{v_{db}^{corrected}}{\sqrt{s_{db}^{corrected}}+\epsilon}$
  - Hyperparameters choice:
    - $\alpha$: needs to be tune
    - $\beta_1$: 0.9 ($dw$) First moment
    - $\beta_2$: 0.999 ($dw^2$) Second moment
    - $\epsilon: 10^{-8}$ Not affect performance
- Learning rate decay
  - 1 epoch = 1 pass through the data
  - $\alpha=\dfrac{1}{1+decay-rate*epoch-num}\alpha_0$
  - Other methods
    - $\alpha=0.95^{epoch-num}\cdot \alpha_0$ ---- exponentially decay
    - $\alpha=\dfrac{k}{\sqrt{epoch-num}}\cdot\alpha_0$ or $\dfrac{k}{\sqrt{t}}\cdot\alpha_0$ ---- discrete staircase
    - Manual decay (small number of model)
- The problem of local optima
  - Unlikely to stuck in a bad local optima, since there are too many dimensions and all algorithms in deep learning.
  - saddle point ---- gradient = 0
  - Problem of plateaus: Make learning slow

### 2.3 Hyperparameter Tuning, Batch Normalization, and Programming Frameworks

#### 2.3.1 Tuning process

- Hyperparameters
  - $\alpha$: learning rate (1st)
  - $\beta$: momentum (2nd)
  - $\beta_1, \beta_2, \epsilon$
  - \# of layers (3rd)
  - \# of hidden units (2nd)
  - learning rate decay (3rd)
  - mini-batch size (2nd)
- Try random values: Don't use a grid
- Coarse to fine: Trying coarse random first, then fine in working well range.

#### 2.3.2 Using an appropriate scale to pick hyperparameters

- Learning rate: $\alpha = 0.0001,...,1$

  - $r=-4*np.random.rand()$ ---- $r\in[-4,0]$
    - $r\in[a,b]$
    - $a=log_{10}0.0001 = -4, b=log_{10}1 = 0$
  - $\alpha=10^r$ ----- $\alpha\in[10^{-4}...10^0]$

- Exponentially Weighted Averages Decay Rate: $\beta=0.9(last\space 10),...,0.999(last\space1000)$

  - $1-\beta=0.1,...,0.001\space r\in[-3,-1]$
    - Reason for focusing on this instead of single $\beta$: $\beta$ is too close to 1, small changes may have big affects.
  - $1-\beta=10^r$
  - $\beta=1-10^r$

- In practice:

  - Re-test/Re-evaluate occasionally.
  - Babysitting one model (don't have enough training capacity) (Panda): One model at one time.
  - Training many models in parallel (Caviar): Can try many at same time.

#### 2.3.3 Batch Normalization

- Implementing Batch Norm
  - Batch Norm: make sure hidden units have standardized mean and variance.
  - Given some intermediate value in NN $z^{(1)},...,z^{(m)}-z^{[l](i)}$ ($l$ for some hidden layers, $i$ for 1 through $m$)
    - $\mu=\dfrac{1}{m}\sum\limits_{i}z^{(i)}$ (Mean)
    - $\sigma^2=\dfrac{1}{m}\sum\limits_i(z_i-\mu)^2$ (Variance)
    - $z_{norm}^{(i)}=\dfrac{z^{(i)}-\mu}{\sqrt{\sigma^2+\epsilon}}$ (Make sure mean=0, variance=1. $\epsilon$ prevent denominator=0)
    - $\widetilde{z}^{(i)}=\gamma z_{norm}^{(i)}+\beta$ ($\gamma, \beta$ are learnable parameters of model)
      - If
        - $\gamma=\sqrt{\sigma^2+\epsilon}$
        - $\beta=\mu$
      - Then $\widetilde{z}^{(i)}=z_{norm}^{(i)}$
  - Use $\widetilde{z}^{[l](i)}$ instead of $z^{[l](i)}$
- Adding Batch Norm to a network
  - ![deep-learning-notes_2-3-3](https://s2.loli.net/2023/11/26/u6UVeshyTq8BXR1.jpg)
  - Parameters: $w^{[1]},b^{[1]},\beta^{[1]},\gamma^{[1]},...,w^{[l]},b^{[l]},\beta^{[l]},\gamma^{[l]}$
    - May use gradient/Adam/momentum to tune $d\beta^{[l]}$ $\beta^{[l]}=\beta^{[l]}-\alpha d\beta^{[l]}$
  - Working with mini-batches: Work the same but on single batches. No need for $b^{[l]}$, since variance are all 1. $\beta\space\space\gamma$ have same dimension with $b$.
- Implementing gradient descent (works with momentum, RMSprop, Adam)
  - for $t=1$...numMiniBatches
    - Compute forwardProp on $X^{{t}}$.
      - In each hidden layer use BN to replace $z^{[l]}$ with $\widetilde{z}^{[l]}$
    - Use backprop to compute $dw^{[l]},db^{[l]},d\beta^{[l]},d\gamma^{[l]}$ (no $db$)
    - Update parameters
      - $w^{[l]}:=w^{[l]}-\alpha dw^{[l]}$
      - $\beta^{[l]}:=\beta^{[l]}-\alpha d\beta^{[l]}$
      - $\gamma^{[l]}:=\gamma^{[l]}-\alpha d\gamma^{[l]}$
- Why does Batch Norm work
  - Covariate Shift: Different test and training data (training on black cats but try to test on other color of cats).
    - Internal Covariate Shift: Between different layers of the network, the distribution of inputs to each layer changes. Recursively it changes the input of the latter layer. May lead to instability and reduced efficiency.
    - Batch norm reduces the problem of input values changes. Make input stable. Let the network learn more independent.
  - Batch norm as regularization
    - In mini-batch, each batch is scaled by the mean/variance computed on just that mini-batch. May adds some noise to each hidden layer's (since is not consider the whole training set) (similar to dropout).
    - This has a slight regularization effect. (Use larger mini-batch size could reduce regularization)
- Batch Norm at test time
  - $\mu, \sigma^2$: estimate using exponentially weighted average (across mini-batch).
    - $ \mu*{\text{global}} = \beta \mu*{\text{global}} + (1 - \beta) \mu $
    - $ \sigma^2*{\text{global}} = \beta \sigma^2*{\text{global}} + (1 - \beta) \sigma^2 $
  - During testing, use the global mean and variance estimates for normalization, instead of the statistics from the current test sample or mini-batch.

#### 2.3.4 Multi-class classification

- Softmax regression
  - $C$ = # classes = 4 (0,...,3)
  - Output layer: 4 nodes for each class. $\hat{y}$ is (4,1) matrix, sum should be 1.
  - $z^{[L]}=w^{[L]}a^{[L-1]}+b^{L}$ (4,1) vector (L represents the output layer)
  - Activation function:
    - $t=e^{(z^{[L]})}$ (4,1) vector
  - $a^{[L]}=\dfrac{e^{z^{[L]}}}{\sum\limits_{j=1}^4t_i}\space\space(4,1), a^{[L]}_i=\dfrac{t_i}{\sum\limits_{j=1}^4t_i}$
- Hardmax: Change beigest to 1, rest all set to 0.
- Training a softmax classifier
  - If $C=2$, softmax reduces to logistic regression.
  - Loss function:
    - $z^{[L]}$->$a^{[L]}=\hat{y}$->$L(\hat{y},y)$ (4,1)
    - Backprop: $dz^{[L]}=\hat{y}-y$ (4,1) $dz^{[L]}=\dfrac{\partial{J}}{\partial{Z^{[L]}}}$
- Deep Learning frameworks
  - TensorFlow![deep-learning-notes_2-3-4](https://s2.loli.net/2023/11/28/utnJEFsobOKPfwQ.jpg)

## III. Structuring Machine Learning Projects

### 3.1 ML Strategy (1)

#### 3.1.1 Setting up your goal

- Orthogonalization

  - Chain of assumptions in ML
    - Fir training set well on cost function: bigger network; Adam
    - Fit dev set well on cost function: Regularization; Bigger training set
    - Fit test set well on cost function: Bigger dev set
    - Perorms well in real world: Change dev set or cost function

- Single number evaluation metric

  - Precision: In examples recognized, what percentage are actually true.
  - Recall: What percentage of target are correctly recognized in whole test set.
  - F1 Score: Average of precision and recall. $\dfrac{1}{\dfrac{1}{P}+\dfrac{1}{R}}$ (harmonic mean)
  - Dev set + Single number evaluation matric: Speed up iteration
  - Use average error rate instead of single error rate for each classes in estimate many classes at same time.

- Satisficing and optimizing matrics

  - Consider classifiers with accuracy and running time.

    - maximize accuracy and subject to running time <= 100ms
    - Accuracy: optimizing
    - Running time: satisfiying

  - N metic: 1 optimizing, n-1 satisficing

- Train/dev/test distributions

  - Come from same distribution. (Use randomly shuffle)
  - Choose a dev set and test set to reflect data you expect to get in the future and consider important to do well on.

- Size of dev/test set

  - For large data set, use 98% training, 1% dev, 1% test
  - Size of test set: Set your test set to be big enough to give high confidence in the overall performance of your system.
  - Sometime use only train+dev, without test set.

- When to change dev/test sets and metrics

  - Filter pornographic images out of error rate:

    - ![deep-learning-notes_3-1-1](https://s2.loli.net/2023/11/28/LqKNWzu4PyxGgbf.jpg)

  - Two Steps

    1. How to define a metric to evaluate classifiers.
    2. How to do well on this metric.

  - If doing well on your metric + dev/test set does not correspond to doing well on your application, change your metric and/or dev/test set.

#### 3.1.2 Comparing to human-level performance

- Why human-level performance:
  - Bayes (optimal) error: best possible error. Can never surpass.
  - Humans are quite good at a lot of tasks. So long as ML is worse than humans, you can:
    - Get labeled data from humans.
    - Gain insight from manual error analysis: Why did a person get this right?
    - Better analysis of bias/variance.

#### 3.1.3 Analyzing bias and variance

- Avoidable bias
  - If training error is far from human error (bayes error), focus on bias (avoidable bias). If training error is close to human error but far from dev error, focus on variance.
  - Consider human-level error as a proxy for Bayes error (since is not too far from human-level error to Bayes error).
- Understanding human-level performance:
  - Based on purpose defined which is the human-level error want to use.
  - If human can perform really well, we can use human-level error as proxy for Bayes error.
- Surpassing human-level performance
  - Not natural perception
  - Lots of data
- Improving your model performance
  - The two fundamental assumptions of supervised learning
    - You can fit the training set pretty well. (Avoidable bias)
    - The training set performance generalizes pretty well to the dev/test set. (Variance)
  - Reducing (avoidable) bias and variance
    - Avoidable bias:
      - Train bigger model.
      - Train longer/better optimization, algorithms (momentum, RMSprop, Adam).
      - NN architecture/hyperparameters search (RNN, CNN).
    - Variance:
      - More data.
      - Regularization (L2, dropout, data augmentation).
      - NN architecture/hyperparameters search.

### 3.2 ML Strategy (2)

#### 3.2.1 Error analysis

- Carrying out error analysis
  - Error analysis (count mislabel, minus from the error rate get the ceiling of error rate)
    - Get ~100 mislabeled dev set examples.
    - Count up how many are dogs.
  - Evaluate multiple ideas in parallel (ideas for cat detection)
    - Fix pictures of dogs being recognized as cats
    - Fix great cats （lions, panthers, etc.） being misrecognized
    - Improve performance on blurry images
    - Check the details of mislabeled images (only few minutes/hours)
    - ![deep-learning-notes_3-2-1](https://s2.loli.net/2023/11/29/2lQR8VdCv7Fwg1W.jpg)
- Cleaning up incorrectly labeled data
  - DL algorithms are quite robust to random errors in the training set. (random error will not affect the algorithm too much)
  - DL algorithms are less robust to systematic errors.
  - When a high fraction of mistake is due to incorrectly label, should spend time to fix it.
  - Correcting incorrect dev/test set examples
    - Apply same process to your dev and test sets to make sure they continue to come from the same distribution.
    - Consider examining examples your algorithm got right as well as ones it got wrong.
    - Train and dev/test data may now come from slightly different distributions.
- Build your first system quickly, then iterate
  - Set up dev/test set and metric
  - Build initial system quickly
  - Use Bias/Variance analysis & Error analysis to prioritize next steps.
- Training and testing on different distributions
  - 200,000 from high quality webpages, 10,000 from low quality mobile app (but we care about this).
    - Shuffle before use those data. (not a good option, will cause the influence of what we care small.)
    - Use mobile app as dev/test set, and just really small part of training set from app. (This we will make our target to what we want.) Maybe 50% in training, 25% in dev, and 25% test.

#### 3.2.2 Mismatched training and dev/test set

- Training-dev set: Same distribution as training set, but not used for training.
- Training error - Training-dev error - Dev error
  - Human level - traning set error: avoidable bias
  - Traning error - Training-dev error: Variance
  - Training-dev error - Dev error: Data mismatch
  - Dev error - Test error: degree of overfitting to dev set.
- Addressing data mismatch
  - Carry out manual error analysis to try to understand difference between training and dev/test sets.
  - Make training data more similar; or collect more data similar to dev/test sets.
  - Artificial data synthesis:
    - Possible issue (overfitting): Original data is 10000, only have the noise of 1, maybe overfit to this 1.
- Transfer learning
  - Pre-training/Fine-tune
  - From relatively large data to relatively small data.
  - But if the target data is too small may not be suitable for transfer learning. (Depend on the outcome we want, it would be valuable to have more data)
  - When makes sense (transfer from A-> B):
    - Task A and B have the same input x.
    - You have a lot more data for Task A than Task B (want this one).
    - Low level features from A could be helpful for learning B.

#### 3.2.3 Learning from multiple tasks

- Loss function for multiple tasks
  - Loss: $\hat{y}_{(4,1)}^{(i)}=\dfrac{1}{m}\sum\limits_{i=1}^m\sum\limits_{j=1}^4L(\hat{y}_j^{(i)},y_j^{(i)})$
  - Sum only over valid of j with 0/1 label. (some of them may only labeled some feature)
  - Unlike softmax regression: One image can have multiple labels
- When multi-task learning makes sense
  - Training on a set of tasks that could benefit from having shared lower-level features.
  - Usually: Amount of data you have for each task is quite similar.
  - Can train a big enough neural network to do well on all the tasks.

#### 3.2.4 End-to-end deep learning

- End-to-end needs lots of data to work well.
- Breaking small data scenario into different deep learning will be better results.
- Wether to use end-to-end learning
  - Pros:
    - Let the data speak.
    - Less hand-designing of components needed.
  - Cons:
    - May need large amount of data
    - Excludes potentially useful hand-designed components.
  - Key question: Do you have sufficient data to learn a function of the complexity needed to map x to y？
    - Use DL to learn individual components.
    - Carefully choose X->Y mappping depending on what tasks you can got data for.

## IV. Convolutional Neural Networks

### 4.1 Foundations of Convolutional Neural Networks

#### 4.1.1 Convolutional operatin

- Vertical Edge Detection

  - Used to identify vertical edges in images, which is a crucial step in image analysis and understanding.
  - A small matrix, typically 3x3 or 5x5, is used as a convolution kernel to detect vertical edges.
  - The kernel slides over the image, moving one pixel at a time.
  - At each position, element-wise multiplication is performed between the kernel and the overlapping image area, followed by a sum to produce an output feature map.
  - High values in the output feature map indicate the presence of a vertical edge at that location.
  - $
    \begin{bmatrix}
    1 & 0 & -1 \\
    1 & 0 & -1 \\
    1 & 0 & -1
    \end{bmatrix}
    $
  - Based on this matrix example below, it will detect lighter on the left and darker on the right.

- Horizontal Edge Detection

  - Brighter on the top and darker on the bottom
  - $
    \begin{bmatrix}
    1 & 1 & 1 \\
    0 & 0 & 0 \\
    -1 & -1 & -1
    \end{bmatrix}
    $
  - TBC

- Other Common Filters

  - Sobel filter

    - $
      \begin{bmatrix}
      1 & 0 & -1 \\
      2 & 0 & -2 \\
      1 & 0 & -1
      \end{bmatrix}
      $

  - Scharr filter
    - $
      \begin{bmatrix}
      3 & 0 & -3 \\
      10 & 0 & -10 \\
      3 & 0 & -3
      \end{bmatrix}
      $

- Padding

  - nxn \* fxf = n-f+1 x n-f+1
  - Problems of convolution:

    - Shrinking output
    - Through away information from edge.

  - Add a padding(p) of 0

    - n+2pxn+2p \* fxf = n+2p-f+1 x n+2p-f+1

  - Valid convolutions: No padding
  - Same convolutions: Pad so that output size is the same as the input size. (padding is $\dfrac{f-1}{2}$)
  - f is usually odd.

- Strided convolution

  - Stepping s steps instead of 1.
  - $\dfrac{n+2p-f}{s}+1$ x $\dfrac{n+2p-f}{s}+1$ (If not integer, bound down to the nearest integer.)

- cross-correlation is the real name of convolution in DL.
- Convolution over volume

  - Set the filter into the same volume as the input matrix. (e.g. RGB image with 3x3x3 filter)
  - If only look at an individual channel, just make other channel with all 0.
  - If consider vertical and horitental seperately, each output 4x4, the final could stack together get a 4x4x2 volume.
  - $n\times n\times n_c * f\times f \times n_c$ -> $n-f+1 \times n-f+1 \times n_c^{'}$ (\# of filters)

- One layer of a CNN

  - Each output add a bias and apply non-learner to it. ReLU(Output+b) --> Consider stack all outputs after this as volume as the a in a=g(z)
  - Consider output as the same as the w in z=wa+b.
  - Number of parameters in one layer: If you have 10 filters that are 3x3x 3 in one layer of a neural network, how many parameters does that layer have？(Consider 3x3x3 + bias, it will be 280 parameters)

- Summary of notation (If layer 1 is a convolution layer)
  - $f^{[l]}=$ filter size (3x3 filter will be f=3)
  - $p^{[l]}=$ padding
  - $s^{[l]}=$ stride
  - Input: $n_H^{[l-1]}\times n_W^{[l-1]}\times n_C^{[l-1]}$
  - Output: $n_H^{[l]}\times n_W^{[l]}\times n_C^{[l]}$
  - $n_{H/W}^{[l]}=\dfrac{n_{H/W}^{[l-1]}+2p^{[l]}-f^{[l]}}{x^{[l]}}+1$ Round down to nearest integer
  - Each filter is: $f^{[l]}\times f^{[l]}\times n_C^{[l-1]}$
  - Activations: $a^{[l]}$ -> $n_H^{[l]}\times n_W^{[l]}\times n_C^{[l]}$ Batch gradient descent $A^{[l]}$ -> $m\times n_H^{[l]}\times n_W^{[l]}\times n_C^{[l]}$
  - Weights: $f^{[l]}\times f^{[l]}\times n_C^{[l-1]}\times n_C^{[l]}$ (The last quantity is \# filters in layer l)
  - bias: $n_C^{[l]}$ - $(1,1,1,n_C^{[l]})$
- A simple example ConvNet

  - ![deep-learning-notes_4-1-1](https://s2.loli.net/2023/12/03/kLT6ir7dZzPOafx.jpg)
  - Get the final output(7x7x40) and take it as a 1960 vector pass through logistic/softmax to get out actual final value.

- Types of layer in a convolutional network
  - Convolution (CONV)
  - Pooling (POOL)
  - Fully connected (FC)

#### 4.1.2 Pooling layers

- No parameters to learn.
- Max pooling
  - Consider input is 4x4 matrix, output a 2x2 matrix. f(filter) = 2, s(stride) = 2. Just max each 2x2 in the input and put it into one cell in the output matrix.
  - Hyperparameters: f(filter) and s(stride).
  - ![deep-learning-notes_4-1-2](https://s2.loli.net/2023/12/04/gnfUEb1wcCqjPoG.jpg)
- Average pooling
  - Instead of take the maxium, take the average.
  - ![deep-learning-notes_4-1-2-2](https://s2.loli.net/2023/12/04/pY8ZKI7L3H2NWnT.jpg)
- Input: $n_H\times n_W\times n_C$
- Output: $\dfrac{n_H-f}{s}+1\times \dfrac{n_W-f}{s}+1\times n_C$ Down to the nearest integer.

#### 4.1.3 CNN example

- Fully Connected layer
  - After several convolutional and pooling layers, the high-level reasoning in the neural network is done via FC layers. The output of the last pooling or convolutional layer, which is typically a multi-dimensional array, is flattened into a single vector of values. This vector is then fed into one or more FC layers.
  - Role:
    - **Integration of Learned Features**: FC layers combine all the features learned by previous convolutional layers across the entire image. While convolutional layers are good at identifying features in local areas of the input image, FC layers help in learning global patterns in the data.
    - **Dimensionality Reduction**: FC layers can be seen as a form of dimensionality reduction, where the high-level, spatially hierarchical features extracted by the convolutional layers are compacted into a form where predictions can be made.
    - **Classification or Regression**: In classification tasks, the final FC layer typically has as many neurons as the number of classes, with a softmax activation function being applied to the output. For regression tasks, the final FC layer's output size and activation function are adjusted according to the specific requirements of the task.
  - Operation is similar to neurons in a standard neural network.
- Example
  - ![deep-learning-notes_4-1-3](https://s2.loli.net/2023/12/04/KuJxvBthlrEYD89.jpg)
  - ![deep-learning-notes_4-1-3-2](https://s2.loli.net/2023/12/04/pl2oRWbte7XZ1i3.jpg)
- Why convolutions?
  - **Parameter sharing:** A feature detector (such as a vertical edge detector) that's useful in one part of the image is probably useful in another part of the image.
  - **Sparsity of connections:** In each layer, each output value depends only on a small number of inputs.
- Training set $(x^{(1)},y^{(1)})...(x^{(m)},y^{(m)})$
- Cost $J=\dfrac{1}{m}\sum\limits_{i=1}^{m}L(\hat{y}^{(i)},y^{(i)})$

### 4.2 Deep Convolutional Models: Case Studies

#### 4.2.1 Case studies (LeNet-5, AlexNet, VGG, ResNets)

- Red notations in the image below are what the network original designed but not suitable for nowadays.

##### 4.2.1.1 LeNet-5

- **Pioneer in CNNs**: One of the earliest Convolutional Neural Networks, primarily used for digit recognition tasks.
- **Architecture:**
  - Consists of 7 layers (excluding input).
  - Includes convolutional layers, average pooling layers, and fully connected layers.
- **Activation Functions**: Uses sigmoid and tanh activation functions in different layers. (Not using nowadays)
- **Local Receptive Fields**: Utilizes 5x5 convolution filters to capture spatial features.
- **Subsampling Layers**: Employs average pooling for subsampling. (Using max pool nowadays)
- ![deep-learning-notes_4-1-1-1](https://s2.loli.net/2023/12/04/L8X2VgAwNvjPcMG.jpg)

##### 4.2.1.2 AlexNet

- Multiple GPUs in the paper is outdated for today. LRN is not useful after lots of other researches.
- **Deeper Architecture**: Contains 8 learned layers, 5 convolutional layers followed by 3 fully connected layers.
- **ReLU Activation**: One of the first CNNs to use ReLU (Rectified Linear Unit) activation function for faster training.
- **Overlapping Pooling**: Uses overlapping max pooling, reducing the network's size and overfitting.
- **Data Augmentation and Dropout**: Employs data augmentation and dropout techniques for better generalization.
- ![deep-learning-notes_4-1-1-2](https://s2.loli.net/2023/12/04/Wz7woIvTYcZO8qb.jpg)

##### 4.2.1.3 VGG-16

- **Simplicity and Depth**: Known for its simplicity and depth, with 16 learned layers.
- **Uniform Architecture**: Features a very uniform architecture, using 3x3 convolution filters with stride and pad of 1, max pooling, and fully connected layers.
- **Convolutional Layers**: Stacks convolutional layers (2-4 layers) before each max pooling layer.
- **Large Number of Parameters**: Has a high number of parameters (around 138 million), making it computationally intensive.
- **Transfer Learning**: Proved to be an excellent model for transfer learning due to its performance and simplicity.
- ![deep-learning-notes_4-1-1-3](https://s2.loli.net/2023/12/04/2VwkSjJBQUe87ZN.jpg)

##### 4.2.1.4 ResNets

- Residual block

  - ![deep-learning-notes_4-2-1-4-1](https://s2.loli.net/2023/12/04/Z1W9ofDxBlUyegz.jpg)
  - Main Path: $a^{[l]}$ --> Linear --> ReLU --> $a^{[l+1]}$ --> Linear --> ReLU --> $a^{[l+2]}$
    - $z^{[l+1]}=W^{[l+1]}a^{[l]}+b^{[l+1]}$ $a^{[l+1]}=g(z^{[l+1]})$ $z^{[l+2]}=W^{[l+2]}a^{[l+1]}+b^{[l+2]}$ $a^{[l+2]}=g(z^{[l+2]})$
  - Short Cut / Skip Connection: $a^{[l]}$ --> ReLU --> $a^{[l+2]}$
    - $a^{[l+2]}=g(z^{[l+2]}+a^{[l]})$

- In normal plain network, the trainning error with increasing number of layers in theory will continuesly decrease. But in reality it will decrease but increase after a sweet point. What ResNet performs is decreasing training error with numbers of layers increase and the training error not increasing again.

- Why do residual networks work?

  - ![deep-learning-notes_4-2-1-4-2](https://s2.loli.net/2023/12/04/9FGXNdz8lqtmnAh.jpg)

  - Residual networks introduce a shortcut or skip connection that allows the network to learn identity functions effectively.
  - This is crucial for training very deep networks by avoiding the vanishing gradient problem.
  - In a residual block:
    - $X$ -> BigNN -> $a^{[l]}$ -> Residual block -> $a^{[l+2]}$
    - Input $X$ is passed through a standard neural network (BigNN) to obtain $a^{[l]}$, and then it goes through the residual block to produce $a^{[l+2]}$.
    - The formulation of a residual block can be represented as:
      $ a^{[l+2]} = g(z^{[l+2]} + a^{[l]}) = g(w^{[l+2]} a^{[l+1]} + b^{[l+2]} + a^{[l]}) $
      - Here, $g$ is the activation function.
      - $z^{[l+2]}$ is the output of the layer just before the activation function.
      - $w^{[l+2]}$ and $b^{[l+2]}$ are the weight and bias of the layer, respectively.
      - If $w^{[l+2]} = 0$ and $b^{[l+2]} = 0$, then $a^{[l+2]} = g(a^{[l]}) = a^{[l]}$, effectively allowing the network to learn the identity function.
    - In cases where the dimensions of $a^{[l+2]}$ and $a^{[l]}$ differ (e.g., $a^{[l]} \in \mathbb{R}^{128}$ and $a^{[l+2]} \in \mathbb{R}^{256}$), a linear transformation $w_s$ (e.g., $w_s \in \mathbb{R}^{256 \times 128}$) is applied to $a^{[l]}$ to match the dimensions.
  - This architecture enables training deeper models without performance degradation, which was a significant challenge in deep learning before the development of ResNet.
  - Understand through backdrop(**<u>personal notes not from the class content</u>**)
    - Consider input as x, the residual block calculation as F(x), identity mapping just drag the x and add it to the residual block's calculation which makes the final value $y=F(x)+x$
    - Backprop for this will be as follow
      - Gradient of the Residual Blokc's Output: $\dfrac{\partial y}{\partial w}$
        - This represents the gradient of the output $y$ with respect to the weights $w$.
      - By chain rule: $\dfrac{\partial y}{\partial w} = \dfrac{\partial y}{\partial F(x)}\dfrac{\partial F(x)}{\partial x}\dfrac{\partial x}{\partial w} + \dfrac{\partial y}{\partial x}\dfrac{\partial x}{\partial w}$
      - Since $y=F(x)+x$, $\dfrac{\partial y}{\partial F(x)}$ and $\dfrac{\partial y}{\partial x}$ should be 1
      - So the formula become $\dfrac{\partial y}{\partial w} = \dfrac{\partial F(x)}{\partial x}\dfrac{\partial x}{\partial w} + \dfrac{\partial x}{\partial w}$
    - Compare to without the identity mapping $x$ added. $\dfrac{\partial y}{\partial w} = \dfrac{\partial F(x)}{\partial x}\dfrac{\partial x}{\partial w}$, there is a $\dfrac{\partial x}{\partial w}$ less. Add this $x$ to $F(x)$ makes the network will not get worse results compare to before.

#### 4.2.2 Network in Network and 1 X 1 convolutions

- 1x1 convolutions
  - **Functionality of 1x1 Convolutions**: A 1x1 convolution, despite its simplicity, acts as a fully connected layer applied to each pixel separately across depth. It's effectively used for channel-wise interactions and dimensionality reduction.
  - **Increasing Network Depth**: 1x1 convolutions can increase the depth of the network without a significant increase in computational complexity.
  - **Dimensionality Reduction**: They are often used for reducing the number of channels (depth) before applying expensive 3x3 or 5x5 convolutions, thus reducing the computational cost.
  - **Feature Re-calibration**: 1x1 convolutions can recalibrate the feature maps channel-wise, enhancing the representational power of the network.
- Using 1x1 convolutions:
  - Reduce dimension: Consider a 28x28x192 input with CONV 1x1 with 32 filters, the output will be 28x28x32.

#### 4.2.3 Inception network

- Motivation for inception network
  - Input 28x28x192
    - Use 1x1x192 with 64 filters, output 28x28x64
    - Use same dimension 3x3x192, output 28x28x128
    - Use same dimension 5x5x192, output 28x28x32
    - use same dimension and s=1 Max-Pool, output 28x28x32.
  - Final output 28x28x256.
  - The problem of computational cost (Consider 5x5x192)
    - 5x5x192x28x28x32 is really big, 120M.
    - Bottleneck layer (Using 1x1 convolution): shrink 28x28x192 --> CONV, 1x1, 16, 1x1x192 --> 28x28x16 (Bottleneck layer) --> CONV 5x5, 32, 5x5x16 --> 28x28x32
    - In total only 28x28x16+28x28x32x5x5x16=12.4M
- Inception moule
  - ![deep-learning-notes_4-2-1](https://s2.loli.net/2023/12/04/V9FCB8xG2HcOaze.jpg)
  - ![deep-learning-notes_4-2-1-2](https://s2.loli.net/2023/12/04/Prp8IkdA2cKUtW3.jpg)
  - The softmax in the itermediate position is used for regularization which is used avoid overfitting.

#### 4.2.4 MobileNet

- Depthwise Separable Convolution
  - Depthwise Convolution
    - Computational cost = \#filter params x \#filter positions x \#of filters
  - Ppointwise Convolution
    - Computational cost = \#filter params x \#filter positions x \# of filters
      - $n_c * n_c * filters$
  - Cost of depthwise seprable convolution / normal convolution
    - $\dfrac{1}{n_c} + \dfrac{1}{f^2}$
- MobileNet v2 Bottleneck

  - Residual Connection

    - ![MobileNet v2 Bottleneck](https://s2.loli.net/2024/01/10/LR3SMIsuQZmTbiH.png)
    - Expansion
    - Depthwise
    - Pointwise (Projection)

  - Similar computational cost as v1
    - MobileNet V2 improves upon V1 by introducing an inverted residual structure with linear bottlenecks, which enhances the efficiency of feature extraction and information flow through the network. This architectural advancement allows V2 to achieve better performance than V1, despite having similar computational costs. Essentially, V2 optimizes the way features are processed and combined, providing more effective and complex feature representation within the same computational budget as V1.

#### 4.2.5 EfficientNet

- EfficientNet is a series of deep learning models known for high efficiency and accuracy in image classification tasks.
- **Compound Scaling**:
  - It introduces a novel compound scaling method, scaling network depth, width, and resolution uniformly with a set of fixed coefficients.
- **High Efficiency and Accuracy**:
  - EfficientNets provide state-of-the-art accuracy for image classification while being more computationally efficient compared to other models.

#### 4.2.6 Inception network

- Transfer Learning
  - Small training set: Freeze all hidden layers (save to disk), only train the softmax unit.
  - Big training set: Freeze less hidden layers, train some of the hidden layers (or use new hidden units), and also own softmax unit.
  - Lots of data: Use the already trained weights and bias as initalization, re-train based on it, as well as the softmax unit.
- Data augmentation
  - Common augmentation method: Mirroring, Random Cropping, (Rotation, Shearing, Local warping, ...)
  - Color shifting: add/minus from RGB. Advanced: PCA / PCA color augmentation.
  - Implementing distortions during training: One CPU thread doing augmentation, and other threads or GPU doing the training at same time.
- State of CV
  - Data needed (little data to lots of data): Object detection < Image recognition < Speach recognition
  - Lots of data - Simpler algotithms (Less hand-engineering)
  - Little data - more hand-engineering ("hacks") - Transfer learning
  - Two sources of knowledge
    - Labeled data
    - Hand engineered features/network architecture/other components
  - Tips for doing well on benchmarks/winning competitions
    - Ensembling: Train several networks independently and average their outputs ($\hat{y}$) 1-2% better. (3-15 networks)
    - Multi-crop at test time: Run classifier on multiple versions of test images and average results. (10-crop: center, four corner, also on mirror image the same 5 crops)
  - Use open source code
    - Use architectures of networks published in the literature.
    - Use open source implementations if possible.
    - Use pretrained models and fine-tune on your dataset.

### 4.3 Object Detection

#### 4.3.1 Object localization

- Want to detect 4 class: 1-pedestrian, 2-car, 3-mtorcycle, 4-background.
- Defining the target label y: Need to out put $b_x, b_y, b_h, b_w$, class label (1-4). (In total 9 elements in the output vector).
- $y=[p_c, b_x, b_y, b_h, b_w, c_1, c_2, c_3]$
  - There is an object $y=[1, b_x, b_y, b_h, b_w, c_1, c_2, c_3]$
  - No object $y=[0, ?, ?, ?, ?, ?, ?, ?]$ Don't care for all of other
- Lost function:
  - $L(\hat{y}, y)=(\hat{y_1} - y_1)^2 + (\hat{y_2} - y_2)^2 + ... + (\hat{y_8} - y_8)^2$ if $y_1=1$
  - $L(\hat{y}, y)=(\hat{y_1} - y_1)^2$ if $y_1=0$

#### 4.3.2 Landmark detection

- Annotate key positions (points-xy coordinate) as landmarks.

#### 4.3.3 Object detection

- Object detection
  - Starts with closely crops images.
  - A window sliding from the top left to bottom right, once and once. If not find increase the window's size and redo the sliding.
  - Run each individual image to the convnet.
- Turning FC layer into convolutional layers
  - Instead directly to FC, use conv filter.
- Convolution implementation of sliding windows
  - ![Convolution implementation of sliding windows](https://s2.loli.net/2024/01/12/Ju5TjpoefSyzt3w.png)
  - Instead of do 4 times 14x14x3, new conv fc share the computation, directly using the 2x2x4.
- Output accurate bounding boxes

  - YOLO algorithm

    - Find the medium point of target and working into the boundary box that contains that point.
    - ![YOLO algorithm](https://s2.loli.net/2024/01/13/7LoM6JaibGInBzr.png)
    - ![YOLO algorithm-2](https://s2.loli.net/2024/01/13/VeFyJ18fQ7kMjKz.png)

  - Intersection over union (IoU)

    - Use to check accuracy.
    - Size of intersection / size of reunion (normally "Correct" if loU $\geq$ 0.5)
    - ![loU](https://s2.loli.net/2024/01/13/4GsDhIeF71TVgZv.png)

  - Non-max suppression

    - Leave the maximum accuracy one, supprese all with high IoU.
    - ![Non-max suppression-1](https://s2.loli.net/2024/01/13/GC6AuH4Rr3zE8if.png)
    - ![Non-max suppression-2](https://s2.loli.net/2024/01/13/VhZCJRq1im3GBFO.png)

  - Anchor Boxes

    - Predefine anchor boxes, associate ojects with anchor boxes.
    - If objects more than assigned anchor boxes, not works. Not same shape, not works.
    - ![Anchor Boxes-1](https://s2.loli.net/2024/01/13/EVAghCZjYbF7wzQ.png)
    - ![Anchor Boxe-2](https://s2.loli.net/2024/01/13/Kn5E2VFlbaAsTdM.png)

  - Training set
    - y is 3x3x2x8 (which is \# of grids x \# of anchors x \# classes(5($p_c. b_x, b_y, b_h, b_w$) + classes))
    - ![YOLO](https://s2.loli.net/2024/01/13/XcFKuDMT5xJfpWC.png)

- Regision Proposals
  - R-CNN: Propose regions. Classify proposed regions one at a time. Output label + bounding box.
  - Fast R-CNN: Propose regions. Use convolution implementation of sliding windows to classify all the proposed regions.
  - Faster R-CNN: Use convolutional network to propose regions.
- Semantic Segmentation with U-Net

  - Per-pixel class labels

    - ![Per-pixel class labels](https://s2.loli.net/2024/01/13/UBQ4Xdpg7O9yZFz.png)

  - Deep Learning for Semantic Segmentation

    - ![Deep Learning for Semantic Segmentation](https://s2.loli.net/2024/01/13/rt2LA5zhEg6Mx1V.png)

  - Transpose Convolution

    - Increase the image size.
    - ![Transpose Convolution - 1](https://s2.loli.net/2024/01/13/ULDT1WobnV4F3Pu.png)
    - ![Transpose Convolution - 2](https://s2.loli.net/2024/01/13/GdOkYNRx8VycA6K.png)

  - U-Net Architecture
    - Skip Connections: Left one get more details in color or anything like that. Right one is more spatial information to figure out where is the object really is.
    - ![U-Net Architecture - Skip Connections](https://s2.loli.net/2024/01/13/m4QoDnL1pJSyzN6.png)
    - ![U-Net Architecture](https://s2.loli.net/2024/01/13/TdvisN1GKEZwuna.png)

### 4.4 Special Applications: Face Recognition & Neural Style Transfer

#### 4.4.1 Face recognition

- Face verification vs. face recognition
  - verification vs recognition ---- 1:1 vs 1:K
  - Verification
    - Input image, name/ID.
    - Output whether the input image is that of the claimed person.
  - Recognition
    - Has a database of K persons
    - Get an input image
    - Output ID if the image is any of the K persons (or "not recognized")
- One-shot learning
  - Learning from one example to recognize the person again.
  - Learning a "similarity" function
    - d(img1, img2) = degree of difference between images
    - If d(img1, img2) $\le \tau$ "same" $\textgreater \space \tau$ "Different"
- Siamese network

  - ![Siamese network](https://s2.loli.net/2024/01/16/eT1uh8jkNFc3gAy.png)
  - Input two differnet images into two CNN and ge the result of them.
  - Such as input $x^{(1)}, x^{(2)}$ seperately into two differnt CNN, and the output will be the encoding of each of them $f(x^{(1)}), f(x^{(2)})$
  - Then compare the distance between them $d(x^{(1)}, x^{(2)}) = ||f(x^{(1)}) - f(x^{(2)})||_2^2$
  - Parameters of NN define an encoding $f(x^{(i)})$
  - Learn parameters so that:
    - If $x^{(i)}, x^{(j)}$ are the smae person, $||f(x^{(i)}) - f(x^{(j)})||^2$ is small.
    - If $x^{(i)}, x^{(j)}$ are the different person, $||f(x^{(i)}) - f(x^{(j)})||^2$ is large..

- Triplet Loss

  - Learning objective: (Anchor, Positive), (Anchor, Negative)

    - Want: $||f(A) - f(P)||^2 + \alpha \le ||f(A) - f(N)||^2$ $\alpha$ is the margin (similar to SVM)
    - $||f(A) - f(P)||^2 - ||f(A) - f(N)||^2 + \alpha \le 0$

  - Loss function

    - Given 3 images A, P, N:
    - $L(A, P, N) = max(||f(A) - f(P)||^2 - ||f(A) - f(N)||^2 + \alpha, 0)$
    - $J = \sum\limits_{i=1}^m L(A^{(i)},P^{(i)},N^{(i)})$

  - If have a training set of 10K pictures of 1k persons. Put those 10K into triplet A, P, N, then put into the loss function.
  - Choosing the triplets A, P, N

    - During training, if A, P, N are chosen randomly, $d(A,P) +\alpha \le d(A, N)$ is easily satisfied.
    - Choose triplets that're "hard" to train on. (such as choose $d(A,P) \approx d(A,N)$)

  - Training set using triplet loss to make J smaller. And make distance of d for same person small and different large.

- Face Verification and Binary Classification
  - ![Learning the similarity function](https://s2.loli.net/2024/01/16/CPgRhtsSjOQkbLG.png)
  - $\hat{y} = \sigma (\sum\limits_{k=1}^{128}w_k|f(x^{(i)})_k-f(x^{(j)})_k| + b)$
  - Only store the $f(x^{(j)})$ as pre-compute, save storage and computational resources.
  - Face verification supervised learning.

#### 4.4.2 Neural style transfer

- What is it?
  - ![Neural style transfer](https://s2.loli.net/2024/01/16/mAw43Z9OPqcR8Bk.png)
- Cost Function
  - $J(G) = \alpha J_{content}(C, G) + \beta J_{Style}(S, G)$
  - Find the generated image G
  - 1.  Initiate G randomly G: 100x100x3
    2.  Use gradient descent to minimize J(G) $G:=G-\dfrac{\partial}{\partial G}J(G)$
- Content Cost Function
  - $J(G) = \alpha J_{content}(C, G) + \beta J_{Style}(S, G)$
  - Layer Selection
    - Shallow layers in the network capture basic features and structures.
    - Deeper layers capture more high-level details and textures.
    - Typically, a layer in the middle of the network is chosen to balance between basic structures and detailed features.
  - Use pre-trained Convent. (E.g., VGG netwok)
  - Let a[l]\(C) and a[l]\(G) be the activation of layer $l$ on the image.
  - If a[l]\(C) and a[l]\(G) are similar, both images have similar content.
  - $J_{content}(C, G) = \dfrac{1}{2}||a^{{[l]}{C}} - a^{{[l]}{G}}||^2$
- Style Cost Function
  - Meaning of the "style" of an image: Say you are using layer l's activation to measure "style". Degine style as correlation between activations across channels.
  - Style matrix (G --> Gram matrix)
    - Let $a_{i,j,k}^{[l]}=$ activation at $(i,j,k)$. $G^{[l]}$ is $n_c^{[l]}$ x $n_c^{[l]}$
      - $G_{kk^{\prime}}^{[l](S)} = \sum\limits_{i=1}^{n_{H}^{[l]}}\sum\limits_{j=1}^{n_{W}^{[l]}} a_{ijk}^{[l](S)} a_{ijk\prime}^{[l](S)}$
      - $G_{kk^{\prime}}^{[l](G)} = \sum\limits_{i=1}^{n_{H}^{[l]}}\sum\limits_{j=1}^{n_{W}^{[l]}} a_{ijk}^{[l](G)} a_{ijk\prime}^{[l](G)}$
    - $J_{style}^{[l]}(S,G)=||G^{[l](S)} - G^{[l](G)}||_F^2$
      - $=\dfrac{1}{(2n_{H}^{[l]} n_{W}^{[l]} n_{C}^{[l]})^2} \sum_k\sum_{k\prime}(G_{kk^{\prime}}^{[l](S)} - G_{kk^{\prime}}^{[l](G)})^2$
    - $J_{Style}(S,G) = \sum\limits_l\lambda^{[l]}J_{Style}^{[l]}(S,G)$
- 1D and 3D Generalizations
  - 1D: 14 x 1($n_c$ Channels) \* 5 x 1 --> 10x16 (16 filters)
  - 3D: 14x14x14 x 1($n_c$ Channels) \* 5x5x5 x 1 --> 10x10x10 x 16 (16 filters)

## V. Sequence Models

### 5.1 Recurrent Neural Networks

#### 5.1.1 RNN model

- Notation
  - Input x: $x^{<1>}, x^{<2>}, ..., x^{<t>}$
  - Total Length of input: $T_x$
  - Output y: $y^{<1>}, y^{<2>}, ..., y^{<t>}$
  - Total Length of output: $T_y$

#### 5.1.2 Backpropagation through time

#### 5.1.3 Different types of RNNs

### 5.2 Natural Language Processing & Word Embeddings

#### 5.2.1 Word Representation

#### 5.2.2 Embedding matrix

#### 5.2.3 Word embeddings in TensorFlow

### 5.3 Sequence Models & Attention Mechanism

#### 5.3.1 Sequence to sequence model

#### 5.3.2 Beam search

#### 5.3.3 Attention model
