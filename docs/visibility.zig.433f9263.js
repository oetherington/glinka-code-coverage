var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":""},
{"lineNum":"   20","line":"pub const Visibility = enum {"},
{"lineNum":"   21","line":"    Public,"},
{"lineNum":"   22","line":"    Protected,"},
{"lineNum":"   23","line":"    Private,"},
{"lineNum":"   24","line":""},
{"lineNum":"   25","line":"    pub fn toString(self: Visibility) []const u8 {","class":"lineCov","hits":"1","order":"568","possible_hits":"1",},
{"lineNum":"   26","line":"        return switch (self) {","class":"lineCov","hits":"4","order":"569","possible_hits":"4",},
{"lineNum":"   27","line":"            .Public => \"public\",","class":"lineCov","hits":"1","order":"570","possible_hits":"1",},
{"lineNum":"   28","line":"            .Protected => \"protected\",","class":"lineCov","hits":"1","order":"573","possible_hits":"1",},
{"lineNum":"   29","line":"            .Private => \"private\",","class":"lineCov","hits":"1","order":"576","possible_hits":"1",},
{"lineNum":"   30","line":"        };"},
{"lineNum":"   31","line":"    }"},
{"lineNum":"   32","line":"};"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"test \"can convert visibility to string\" {","class":"lineCov","hits":"2","order":"566","possible_hits":"2",},
{"lineNum":"   35","line":"    try std.testing.expectEqualStrings(","class":"lineCov","hits":"1","order":"571","possible_hits":"1",},
{"lineNum":"   36","line":"        \"public\","},
{"lineNum":"   37","line":"        Visibility.Public.toString(),","class":"lineCov","hits":"1","order":"567","possible_hits":"1",},
{"lineNum":"   38","line":"    );"},
{"lineNum":"   39","line":"    try std.testing.expectEqualStrings(","class":"lineCov","hits":"1","order":"574","possible_hits":"1",},
{"lineNum":"   40","line":"        \"protected\","},
{"lineNum":"   41","line":"        Visibility.Protected.toString(),","class":"lineCov","hits":"1","order":"572","possible_hits":"1",},
{"lineNum":"   42","line":"    );"},
{"lineNum":"   43","line":"    try std.testing.expectEqualStrings(","class":"lineCov","hits":"1","order":"577","possible_hits":"1",},
{"lineNum":"   44","line":"        \"private\","},
{"lineNum":"   45","line":"        Visibility.Private.toString(),","class":"lineCov","hits":"1","order":"575","possible_hits":"1",},
{"lineNum":"   46","line":"    );"},
{"lineNum":"   47","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 20:45:33", "instrumented" : 12, "covered" : 12,};
var merged_data = [];
