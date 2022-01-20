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
{"lineNum":"   19","line":"const Type = @import(\"../common/types/type.zig\").Type;"},
{"lineNum":"   20","line":"const TokenType = @import(\"../common/token.zig\").Token.Type;"},
{"lineNum":"   21","line":"const TypeBook = @import(\"./typebook.zig\").TypeBook;"},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"pub const OpEntry = union(Variant) {"},
{"lineNum":"   24","line":"    const Variant = enum {"},
{"lineNum":"   25","line":"        Unary,"},
{"lineNum":"   26","line":"        Binary,"},
{"lineNum":"   27","line":"    };"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"    // When output is null, the output type is the same as the input type"},
{"lineNum":"   30","line":"    Unary: struct {"},
{"lineNum":"   31","line":"        input: Type.Ptr,"},
{"lineNum":"   32","line":"        output: ?Type.Ptr,"},
{"lineNum":"   33","line":"    },"},
{"lineNum":"   34","line":"    Binary: struct {"},
{"lineNum":"   35","line":"        input: Type.Ptr,"},
{"lineNum":"   36","line":"        output: ?Type.Ptr,"},
{"lineNum":"   37","line":"    },"},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"    pub fn un(input: Type.Ptr, output: ?Type.Ptr) OpEntry {","class":"lineCov","hits":"1","order":"175","possible_hits":"1",},
{"lineNum":"   40","line":"        return OpEntry{","class":"lineCov","hits":"1","order":"179","possible_hits":"1",},
{"lineNum":"   41","line":"            .Unary = .{","class":"lineCov","hits":"1","order":"176","possible_hits":"1",},
{"lineNum":"   42","line":"                .input = input,","class":"lineCov","hits":"1","order":"177","possible_hits":"1",},
{"lineNum":"   43","line":"                .output = output,","class":"lineCov","hits":"1","order":"178","possible_hits":"1",},
{"lineNum":"   44","line":"            },"},
{"lineNum":"   45","line":"        };"},
{"lineNum":"   46","line":"    }"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"    pub fn bin(input: Type.Ptr, output: ?Type.Ptr) OpEntry {","class":"lineCov","hits":"1","order":"188","possible_hits":"1",},
{"lineNum":"   49","line":"        return OpEntry{","class":"lineCov","hits":"1","order":"192","possible_hits":"1",},
{"lineNum":"   50","line":"            .Binary = .{","class":"lineCov","hits":"1","order":"189","possible_hits":"1",},
{"lineNum":"   51","line":"                .input = input,","class":"lineCov","hits":"1","order":"190","possible_hits":"1",},
{"lineNum":"   52","line":"                .output = output,","class":"lineCov","hits":"1","order":"191","possible_hits":"1",},
{"lineNum":"   53","line":"            },"},
{"lineNum":"   54","line":"        };"},
{"lineNum":"   55","line":"    }"},
{"lineNum":"   56","line":"};"},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"pub const OpMap = [std.meta.fields(TokenType).len]?OpEntry;"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"pub fn populateOpMap(b: *TypeBook) void {","class":"lineCov","hits":"2","order":"171","possible_hits":"2",},
{"lineNum":"   61","line":"    std.mem.set(?OpEntry, b.opMap[0..], null);","class":"lineCov","hits":"1","order":"172","possible_hits":"1",},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"    const h = (struct {"},
{"lineNum":"   64","line":"        book: *TypeBook,"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"        fn put(self: @This(), op: TokenType, entry: OpEntry) void {","class":"lineCov","hits":"2","order":"180","possible_hits":"2",},
{"lineNum":"   67","line":"            self.book.opMap[@enumToInt(op)] = entry;","class":"lineCov","hits":"1","order":"181","possible_hits":"1",},
{"lineNum":"   68","line":"        }"},
{"lineNum":"   69","line":"    }){ .book = b };","class":"lineCov","hits":"1","order":"173","possible_hits":"1",},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"    h.put(.Inc, OpEntry.un(&b.numberTy, null));","class":"lineCov","hits":"1","order":"174","possible_hits":"1",},
{"lineNum":"   72","line":"    h.put(.Dec, OpEntry.un(&b.numberTy, null));","class":"lineCov","hits":"1","order":"182","possible_hits":"1",},
{"lineNum":"   73","line":"    h.put(.BitNot, OpEntry.un(&b.numberTy, null));","class":"lineCov","hits":"1","order":"183","possible_hits":"1",},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"    h.put(.LogicalNot, OpEntry.un(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"184","possible_hits":"1",},
{"lineNum":"   76","line":""},
{"lineNum":"   77","line":"    h.put(.Delete, OpEntry.un(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"185","possible_hits":"1",},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"    h.put(.Nullish, OpEntry.un(&b.anyTy, &b.anyTy)); // TODO: Fix output","class":"lineCov","hits":"1","order":"186","possible_hits":"1",},
{"lineNum":"   80","line":""},
{"lineNum":"   81","line":"    h.put(.Assign, OpEntry.bin(&b.anyTy, null));","class":"lineCov","hits":"1","order":"187","possible_hits":"1",},
{"lineNum":"   82","line":"    h.put(.NullishAssign, OpEntry.bin(&b.anyTy, &b.anyTy)); // TODO: Fix output","class":"lineCov","hits":"1","order":"193","possible_hits":"1",},
{"lineNum":"   83","line":""},
{"lineNum":"   84","line":"    h.put(.TypeOf, OpEntry.un(&b.anyTy, &b.stringTy));","class":"lineCov","hits":"1","order":"194","possible_hits":"1",},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"    h.put(","class":"lineCov","hits":"1","order":"230","possible_hits":"1",},
{"lineNum":"   87","line":"        .Add,"},
{"lineNum":"   88","line":"        OpEntry.bin(b.getUnion(&.{ &b.numberTy, &b.stringTy }), null),","class":"lineCov","hits":"1","order":"195","possible_hits":"1",},
{"lineNum":"   89","line":"    );"},
{"lineNum":"   90","line":"    h.put(","class":"lineCov","hits":"1","order":"254","possible_hits":"1",},
{"lineNum":"   91","line":"        .AddAssign,"},
{"lineNum":"   92","line":"        OpEntry.bin(b.getUnion(&.{ &b.numberTy, &b.stringTy }), null),","class":"lineCov","hits":"1","order":"231","possible_hits":"1",},
{"lineNum":"   93","line":"    );"},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"    h.put(.Sub, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"255","possible_hits":"1",},
{"lineNum":"   96","line":"    h.put(.Mul, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"256","possible_hits":"1",},
{"lineNum":"   97","line":"    h.put(.Pow, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"257","possible_hits":"1",},
{"lineNum":"   98","line":"    h.put(.Div, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"258","possible_hits":"1",},
{"lineNum":"   99","line":"    h.put(.Mod, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"259","possible_hits":"1",},
{"lineNum":"  100","line":"    h.put(.SubAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"260","possible_hits":"1",},
{"lineNum":"  101","line":"    h.put(.MulAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"261","possible_hits":"1",},
{"lineNum":"  102","line":"    h.put(.DivAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"262","possible_hits":"1",},
{"lineNum":"  103","line":"    h.put(.ModAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"263","possible_hits":"1",},
{"lineNum":"  104","line":"    h.put(.PowAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"264","possible_hits":"1",},
{"lineNum":"  105","line":"    h.put(.BitAndAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"265","possible_hits":"1",},
{"lineNum":"  106","line":"    h.put(.BitOrAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"266","possible_hits":"1",},
{"lineNum":"  107","line":"    h.put(.BitNotAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"267","possible_hits":"1",},
{"lineNum":"  108","line":"    h.put(.BitXorAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"268","possible_hits":"1",},
{"lineNum":"  109","line":"    h.put(.ShiftRightAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"269","possible_hits":"1",},
{"lineNum":"  110","line":"    h.put(.ShiftRightUnsignedAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"270","possible_hits":"1",},
{"lineNum":"  111","line":"    h.put(.ShiftLeftAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"271","possible_hits":"1",},
{"lineNum":"  112","line":"    h.put(.BitAnd, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"272","possible_hits":"1",},
{"lineNum":"  113","line":"    h.put(.BitOr, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"273","possible_hits":"1",},
{"lineNum":"  114","line":"    h.put(.BitXor, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"274","possible_hits":"1",},
{"lineNum":"  115","line":"    h.put(.ShiftRight, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"275","possible_hits":"1",},
{"lineNum":"  116","line":"    h.put(.ShiftRightUnsigned, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"276","possible_hits":"1",},
{"lineNum":"  117","line":"    h.put(.ShiftLeft, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"277","possible_hits":"1",},
{"lineNum":"  118","line":""},
{"lineNum":"  119","line":"    h.put(.CmpGreater, OpEntry.bin(&b.numberTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"278","possible_hits":"1",},
{"lineNum":"  120","line":"    h.put(.CmpGreaterEq, OpEntry.bin(&b.numberTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"279","possible_hits":"1",},
{"lineNum":"  121","line":"    h.put(.CmpLess, OpEntry.bin(&b.numberTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"280","possible_hits":"1",},
{"lineNum":"  122","line":"    h.put(.CmpLessEq, OpEntry.bin(&b.numberTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"281","possible_hits":"1",},
{"lineNum":"  123","line":""},
{"lineNum":"  124","line":"    h.put(.CmpEq, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"282","possible_hits":"1",},
{"lineNum":"  125","line":"    h.put(.CmpStrictEq, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"283","possible_hits":"1",},
{"lineNum":"  126","line":"    h.put(.CmpNotEq, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"284","possible_hits":"1",},
{"lineNum":"  127","line":"    h.put(.CmpStrictNotEq, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"285","possible_hits":"1",},
{"lineNum":"  128","line":"    h.put(.LogicalAnd, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"286","possible_hits":"1",},
{"lineNum":"  129","line":"    h.put(.LogicalOr, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"287","possible_hits":"1",},
{"lineNum":"  130","line":"    h.put(.LogicalAndAssign, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"288","possible_hits":"1",},
{"lineNum":"  131","line":"    h.put(.LogicalOrAssign, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"289","possible_hits":"1",},
{"lineNum":"  132","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-20 20:31:30", "instrumented" : 63, "covered" : 63,};
var merged_data = [];
