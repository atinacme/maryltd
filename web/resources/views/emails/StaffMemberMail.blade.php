@component('mail::message')
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2")

You have successfully registered as the Staff Member of Mary Jewellery, please click the below link to activate<br>
<a href="{{ env('HOST') }}/verifyStaffMember/{{ $body['id'] }}/{{ $body['shop'] }}" target="_blank">{{ $body['appDomain'] }}?shop={{ $body['shop'] }}</a><br>
Thanks,<br>
Mary Jewellery
@endcomponent
