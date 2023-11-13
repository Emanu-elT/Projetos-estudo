close all
clear all

%---------------------------
A1 = imread('umd_02_i-160.bmp');
B1 = imread('face.bmp');
A = rgb2gray(A1);
B = rgb2gray(B1);
% A = A1(:,:,1); 
% B = B1(:,:,1);

 template = B;
 I = A; 
imshow(template);

cross = normxcorr2(template, I);
figure
imshow(cross);

correlacao = max(max(cross));

if(correlacao > 0.8)

[y,x] = find(cross==max(cross(:)));
ynew = y - size(template,1);
xnew = x - size(template,2);
figure

imshow(I);
imrect(gca,[xnew, ynew, size(template,1),...
     size(template,1)]);

else
    figure
    imshow(A1);
end
