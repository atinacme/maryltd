@component('mail::message')
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2")
@if(count($body) == 1)
<p>Order detail is described below:</p>
@else
<p>All Order details with supplier {{$body[0]['manufacturer']}} are described below:</p>
@endif

@foreach($body as $i)
<ul>
    <li>Id: {{ $i['id'] }}</li>
    <li>Shop: {{ $i['name'] }}</li>
    <li>Status: {{ $i['status'] }}</li>
    <li>Stock Number: {{ $i['stock_number'] }}</li>
    <li>Quantity: {{ $i['quantity'] }}</li>
    <li>Karat: {{ $i['karat'] }}</li>
    <li>Colour: {{ $i['colour'] }}</li>
    <li>Size: {{ $i['size'] }}</li>
    <li>Description: {{ $i['description'] }}</li>
    <li>Notes: {{ $i['notes'] }}</li>
    <li>Image Attachment: {{ $i['image_attachment'] }} <img src="{{ $i['image_attachment'] }}"></li>
    <li>Customer: {{ $i['customer'] }}</li>
    <li>Customer Company: {{ $i['customer_company'] }}</li>
    <li>Manufacturer: {{ $i['manufacturer'] }}</li>
    <li>Created By: {{ $i['created_by'] }}</li>
    <li>Created On: {{ $i['created_on'] }}</li>
</ul>
<hr/>
@endforeach

Thanks,<br>
Mary Jewellery
@endcomponent
