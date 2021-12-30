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
{"lineNum":"   19","line":"const expectEqual = std.testing.expectEqual;"},
{"lineNum":"   20","line":"const expectEqualStrings = std.testing.expectEqualStrings;"},
{"lineNum":"   21","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"pub const RedefinitionError = struct {"},
{"lineNum":"   24","line":"    name: []const u8,"},
{"lineNum":"   25","line":"    firstDefined: Cursor,"},
{"lineNum":"   26","line":"    secondDefined: Cursor,"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"    pub fn new(","class":"lineCov","hits":"1","order":"1546","possible_hits":"1",},
{"lineNum":"   29","line":"        name: []const u8,"},
{"lineNum":"   30","line":"        firstDefined: Cursor,"},
{"lineNum":"   31","line":"        secondDefined: Cursor,"},
{"lineNum":"   32","line":"    ) RedefinitionError {"},
{"lineNum":"   33","line":"        return RedefinitionError{","class":"lineCov","hits":"1","order":"1550","possible_hits":"1",},
{"lineNum":"   34","line":"            .name = name,","class":"lineCov","hits":"1","order":"1547","possible_hits":"1",},
{"lineNum":"   35","line":"            .firstDefined = firstDefined,","class":"lineCov","hits":"1","order":"1548","possible_hits":"1",},
{"lineNum":"   36","line":"            .secondDefined = secondDefined,","class":"lineCov","hits":"1","order":"1549","possible_hits":"1",},
{"lineNum":"   37","line":"        };"},
{"lineNum":"   38","line":"    }"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    pub fn report(self: RedefinitionError, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"1562","possible_hits":"4",},
{"lineNum":"   41","line":"        try writer.print(","class":"linePartCov","hits":"1","order":"1567","possible_hits":"2",},
{"lineNum":"   42","line":"            \"Error: {d}:{d}: Redefinition of symbol \'{s}\' (first defined at line {d})\\n\","},
{"lineNum":"   43","line":"            .{"},
{"lineNum":"   44","line":"                self.secondDefined.ln,","class":"linePartCov","hits":"1","order":"1563","possible_hits":"2",},
{"lineNum":"   45","line":"                self.secondDefined.ch,","class":"linePartCov","hits":"1","order":"1564","possible_hits":"2",},
{"lineNum":"   46","line":"                self.name,","class":"linePartCov","hits":"1","order":"1565","possible_hits":"2",},
{"lineNum":"   47","line":"                self.firstDefined.ln,","class":"linePartCov","hits":"1","order":"1566","possible_hits":"2",},
{"lineNum":"   48","line":"            },"},
{"lineNum":"   49","line":"        );"},
{"lineNum":"   50","line":"    }"},
{"lineNum":"   51","line":"};"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"test \"can initialize a RedefinitionError\" {","class":"lineCov","hits":"2","order":"1697","possible_hits":"2",},
{"lineNum":"   54","line":"    const name = \"aSymbol\";"},
{"lineNum":"   55","line":"    const firstDefined = Cursor.new(1, 1);","class":"lineCov","hits":"1","order":"1698","possible_hits":"1",},
{"lineNum":"   56","line":"    const secondDefined = Cursor.new(3, 3);","class":"lineCov","hits":"1","order":"1699","possible_hits":"1",},
{"lineNum":"   57","line":"    const err = RedefinitionError.new(name, firstDefined, secondDefined);","class":"lineCov","hits":"1","order":"1700","possible_hits":"1",},
{"lineNum":"   58","line":"    try expectEqualStrings(name, err.name);","class":"lineCov","hits":"1","order":"1701","possible_hits":"1",},
{"lineNum":"   59","line":"    try expectEqual(firstDefined, err.firstDefined);","class":"lineCov","hits":"1","order":"1702","possible_hits":"1",},
{"lineNum":"   60","line":"    try expectEqual(secondDefined, err.secondDefined);","class":"lineCov","hits":"1","order":"1703","possible_hits":"1",},
{"lineNum":"   61","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2021-12-30 12:35:19", "instrumented" : 18, "covered" : 18,};
var merged_data = [];
