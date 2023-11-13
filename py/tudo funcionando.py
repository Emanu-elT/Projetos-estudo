import cv2
import numpy as np
import os
# Carregar as imagens B, C e D (target)
B = cv2.imread('py/face.bmp', cv2.IMREAD_GRAYSCALE)
C = cv2.imread('py/face_lateral_01.bmp', cv2.IMREAD_GRAYSCALE)
D= cv2.imread('py/face_lateral_02.bmp', cv2.IMREAD_GRAYSCALE)
# Definir um limiar de correlação
threshold = 0.8
# Pasta contendo as imagens alvo
target_folder = 'py/umd_02_i-440'
# Listar os arquivos de imagem na pasta
image_files = [f for f in os.listdir(target_folder) if f.lower().endswith(('.bmp'))]
for image_file in image_files:
    # Carregar a imagem template (imagem A)
    A = cv2.imread(os.path.join(target_folder, image_file), cv2.IMREAD_GRAYSCALE)
    # Calcular a correlação normalizada entre o template B e a imagem A
    # Encontrar as coordenadas do ponto de máxima correlação
    # Dimensões do template B
    crossB = cv2.matchTemplate(A, B, cv2.TM_CCOEFF_NORMED)
    min_valB, max_valB, min_locB, max_locB = cv2.minMaxLoc(crossB)
    yB, xB = max_locB
    heightB, widthB = B.shape
    # Calcular a correlação normalizada entre o template C e a imagem A
    # Encontrar as coordenadas do ponto de máxima correlação
    # Dimensões do template C
    crossC = cv2.matchTemplate(A, C, cv2.TM_CCOEFF_NORMED)
    min_valC, max_valC, min_locC, max_locC = cv2.minMaxLoc(crossC)
    yC, xC = max_locC
    heightC, widthC = C.shape
    # Calcular a correlação normalizada entre o template D e a imagem A
    # Encontrar as coordenadas do ponto de máxima correlação
    # Dimensões do template D
    crossD = cv2.matchTemplate(A, D, cv2.TM_CCOEFF_NORMED)
    min_valD, max_valD, min_locD, max_locD = cv2.minMaxLoc(crossD)
    yD, xD = max_locD
    heightD, widthD = D.shape


    if max_valB  > threshold:
        # Destacar a área de máxima correlação com um retângulo para o target frontal
        top_leftB = max_locB
        bottom_rightB = (top_leftB[0] + widthB, top_leftB[1] + heightB)
        cv2.rectangle(A, top_leftB, bottom_rightB, (255, 0, 0), 2)
         # Adicionar o nome do arquivo como texto na imagem
        text = os.path.splitext(image_file)[0]  # Obter o nome do arquivo sem a extensão
        cv2.putText(A, text, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        cv2.imshow(text, A)
    elif max_valC  > threshold:
        # Destacar a área de máxima correlação com um retângulo C
        top_leftC = max_locC
        bottom_rightC = (top_leftC[0] + widthC, top_leftC[1] + heightC)
        cv2.rectangle(A, top_leftC, bottom_rightC, (255,0 , 0), 2)
         # Adicionar o nome do arquivo como texto na imagem
        text = os.path.splitext(image_file)[0]  # Obter o nome do arquivo sem a extensão
        cv2.putText(A, text, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        cv2.imshow(text, A)
    elif max_valD  > threshold:
        # Destacar a área de máxima correlação com um retângulo D
        top_leftD = max_locD
        bottom_rightD = (top_leftD[0] + widthD, top_leftD[1] + heightD)
        cv2.rectangle(A, top_leftD, bottom_rightD, (255, 0, 0), 2)
         # Adicionar o nome do arquivo como texto na imagem
        text = os.path.splitext(image_file)[0]  # Obter o nome do arquivo sem a extensão
        cv2.putText(A, text, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        cv2.imshow(text, A)
    #else:
       # cv2.imshow('Imagem Original', A)
cv2.waitKey(0)
cv2.destroyAllWindows()